package com.upost_service.post_service.service;

import com.upost_service.post_service.Event.PostEvent;
import com.upost_service.post_service.client.UserServiceClient;
import com.upost_service.post_service.controller.FileStorageService;
import com.upost_service.post_service.dto.*;
import com.upost_service.post_service.model.Post;
import com.upost_service.post_service.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;
    private final UserServiceClient userServiceClient;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final FileStorageService fileStorageService;

    private static final String TOPIC_POST_EVENTS = "post-events";

    public PostResponse createPost(String userId, CreatePostRequest request,
            List<MultipartFile> images, MultipartFile video) {

        log.info("Creating post for userId={}", userId);

        UserDTO user = userServiceClient.getUserById(userId);
        log.debug("Fetched user details for userId={}, username={}", userId, user.getUsername());

        List<String> imageUrls = new ArrayList<>();
        if (images != null) {
            log.info("Uploading {} image(s) for userId={}", images.size(), userId);
            for (MultipartFile image : images) {
                String url = fileStorageService.saveImage(image);
                imageUrls.add(url);
            }
        }

        String videoUrl = null;
        if (video != null && !video.isEmpty()) {
            log.info("Uploading video for userId={}", userId);
            videoUrl = fileStorageService.saveVideo(video);
        }

        Post post = new Post();
        post.setUserId(userId);
        post.setUsername(user.getUsername());
        post.setUserProfilePicture(user.getProfilePicture());
        post.setContent(request.getContent());
        post.setImages(imageUrls != null ? imageUrls : List.of());
        post.setVideoUrl(videoUrl);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        log.info("Post created successfully. postId={}, userId={}", savedPost.getId(), userId);

        return mapToPostResponse(savedPost, userId);
    }

    public PostResponse getPost(String postId, String currentUserId) {
        log.debug("Fetching post postId={} for userId={}", postId, currentUserId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found: postId={}", postId);
                    return new RuntimeException("Post not found");
                });

        if (post.isDeleted()) {
            log.warn("Attempt to access deleted post postId={}", postId);
            throw new RuntimeException("Post has been deleted");
        }

        return mapToPostResponse(post, currentUserId);
    }

    public Page<PostResponse> getUserPosts(String userId, String currentUserId, Pageable pageable) {
        log.debug("Fetching posts for userId={}", userId);

        Page<Post> posts = postRepository
                .findByUserIdAndIsDeletedFalseOrderByCreatedAtDesc(userId, pageable);

        return posts.map(post -> mapToPostResponse(post, currentUserId));
    }

    public Page<PostResponse> getUserMediaPosts(String userId, String currentUserId, Pageable pageable) {
        log.debug("Fetching media posts for userId={}", userId);

        Page<Post> posts = postRepository.findUserMediaPosts(userId, pageable);

        return posts.map(post -> mapToPostResponse(post, currentUserId));
    }

    public Page<PostResponse> getUserLikedPosts(String userId, String currentUserId, Pageable pageable) {
        log.debug("Fetching liked posts for userId={}", userId);

        Page<Post> posts = postRepository.findUserLikedPosts(userId, pageable);

        return posts.map(post -> mapToPostResponse(post, currentUserId));
    }

    public Page<PostResponse> getFeed(String userId, Pageable pageable) {
        log.debug("Fetching feed for userId={}", userId);

        List<String> following = userServiceClient.getUserFollowing(userId);
        following.add(userId);

        Page<Post> posts = postRepository
                .findByUserIdInAndIsDeletedFalseOrderByCreatedAtDesc(following, pageable);

        return posts.map(post -> mapToPostResponse(post, userId));
    }

    public PostResponse likePost(String postId, String userId) {
        log.info("User {} liking post {}", userId, postId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found while liking: postId={}", postId);
                    return new RuntimeException("Post not found");
                });

        post.getLikes().add(userId);
        Post savedPost = postRepository.save(post);

        UserDTO user = userServiceClient.getUserById(userId);

        PostEvent event = new PostEvent();
        event.setType("POST_LIKED");
        event.setPostId(postId);
        event.setPostOwnerId(post.getUserId());
        event.setUserId(userId);
        event.setUsername(user.getUsername());

        kafkaTemplate.send(TOPIC_POST_EVENTS, event);
        log.info("POST_LIKED event sent for postId={} by userId={}", postId, userId);

        return mapToPostResponse(savedPost, userId);
    }

    public PostResponse unlikePost(String postId, String userId) {
        log.info("User {} unliking post {}", userId, postId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found while unliking: postId={}", postId);
                    return new RuntimeException("Post not found");
                });

        post.getLikes().remove(userId);
        Post savedPost = postRepository.save(post);

        return mapToPostResponse(savedPost, userId);
    }

    public PostResponse addComment(String postId, String userId, CommentRequest request) {
        log.info("User {} adding comment on post {}", userId, postId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found while commenting: postId={}", postId);
                    return new RuntimeException("Post not found");
                });

        UserDTO user = userServiceClient.getUserById(userId);

        Post.Comment comment = new Post.Comment();
        comment.setUserId(userId);
        comment.setUsername(user.getUsername());
        comment.setUserProfilePicture(user.getProfilePicture());
        comment.setContent(request.getContent());

        post.getComments().add(comment);
        post.setUpdatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);

        PostEvent event = new PostEvent();
        event.setType("COMMENT");
        event.setPostId(postId);
        event.setPostOwnerId(post.getUserId());
        event.setUserId(userId);
        event.setUsername(user.getUsername());
        event.setComment(request.getContent());

        kafkaTemplate.send(TOPIC_POST_EVENTS, event);
        log.info("COMMENT event sent for postId={} by userId={}", postId, userId);

        return mapToPostResponse(savedPost, userId);
    }

    public void deletePost(String postId, String userId) {
        log.info("User {} attempting to delete post {}", userId, postId);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found while deleting: postId={}", postId);
                    return new RuntimeException("Post not found");
                });

        if (!post.getUserId().equals(userId)) {
            log.warn("Unauthorized delete attempt: postId={}, userId={}", postId, userId);
            throw new RuntimeException("You can only delete your own posts");
        }

        post.setDeleted(true);
        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);

        log.info("Post deleted successfully. postId={}, userId={}", postId, userId);
    }

    private PostResponse mapToPostResponse(Post post, String currentUserId) {

        List<CommentResponse> recentComments = post.getComments().stream()
                .skip(Math.max(0, post.getComments().size() - 3))
                .map(comment -> CommentResponse.builder()
                        .id(comment.getId())
                        .userId(comment.getUserId())
                        .username(comment.getUsername())
                        .userProfilePicture(comment.getUserProfilePicture())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return PostResponse.builder()
                .id(post.getId())
                .userId(post.getUserId())
                .username(post.getUsername())
                .userProfilePicture(post.getUserProfilePicture())
                .content(post.getContent())
                .images(post.getImages())
                .video(post.getVideoUrl())
                .likesCount(post.getLikes().size())
                .commentsCount(post.getComments().size())
                .sharesCount(post.getSharesCount())
                .isLiked(post.getLikes().contains(currentUserId))
                .recentComments(recentComments)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
