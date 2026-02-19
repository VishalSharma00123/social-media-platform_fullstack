// app/(app)/profile/[username]/page.tsx
"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { User, Post, PageResponse, Conversation } from "@/lib/types";
import PostCard from "@/components/PostCard";
import { auth } from "@/lib/auth";

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const router = useRouter();
    const [profile, setProfile] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.getUser();
    const isOwnProfile = currentUser?.username === username;

    const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
    const [postsLoading, setPostsLoading] = useState(false);

    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        users: User[];
        loading: boolean;
    }>({
        isOpen: false,
        title: "",
        users: [],
        loading: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: "",
        bio: ""
    });
    const [updating, setUpdating] = useState(false);

    const getMediaUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;

        // Profile pictures are served by User Service (8081)
        if (path.includes("profile-pictures")) {
            return `http://localhost:8081${path}`;
        }

        // Post images/videos are served by Post Service (8082)
        return `http://localhost:8082${path}`;
    };

    useEffect(() => {
        loadProfile();
    }, [username]);

    useEffect(() => {
        if (profile?.id) {
            loadUserPosts();
        }
    }, [profile?.id, activeTab]);

    const loadProfile = async () => {
        try {
            const response = await api.get<User>(`/api/users/profile/${username}`);
            setProfile(response.data);
        } catch (error) {
            console.error("Failed to load profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserPosts = async () => {
        if (!profile?.id) return;
        setPostsLoading(true);
        try {
            let endpoint = `/api/posts/user/${profile.id}`;
            if (activeTab === 'media') {
                endpoint = `/api/posts/user/${profile.id}/media`;
            } else if (activeTab === 'likes') {
                endpoint = `/api/posts/user/${profile.id}/liked`;
            }

            const response = await api.get<PageResponse<Post>>(endpoint, {
                params: { page: 0, size: 20 }
            });
            setPosts(response.data.content);
        } catch (error) {
            console.error(`Failed to load ${activeTab}:`, error);
        } finally {
            setPostsLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!profile) return;

        try {
            await api.post(`/api/users/follow/${profile.id}`);
            loadProfile();
        } catch (error) {
            console.error("Failed to follow:", error);
        }
    };

    const handleUnfollow = async () => {
        if (!profile) return;

        try {
            await api.post(`/api/users/unfollow/${profile.id}`);
            loadProfile();
        } catch (error) {
            console.error("Failed to unfollow:", error);
        }
    };

    const handleMessageClick = async () => {
        if (!profile) return;
        try {
            const response = await api.get<Conversation>(`/api/conversations/${profile.id}`);
            router.push(`/messages/${response.data.id}`);
        } catch (error) {
            console.error("Failed to start conversation:", error);
        }
    };

    const handleProfilePictureUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await api.post("/api/users/profile/picture", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            loadProfile();
        } catch (error) {
            console.error("Failed to upload picture:", error);
        }
    };

    const fetchUserList = async (type: 'followers' | 'following') => {
        if (!profile) return;
        setModalConfig(prev => ({ ...prev, isOpen: true, title: type.charAt(0).toUpperCase() + type.slice(1), loading: true, users: [] }));
        try {
            const res = await api.get<User[]>(`/api/users/${profile.id}/${type}`);
            setModalConfig(prev => ({ ...prev, users: res.data, loading: false }));
        } catch (error) {
            console.error(`Failed to fetch ${type}:`, error);
            setModalConfig(prev => ({ ...prev, loading: false }));
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const response = await api.put<User>("/api/users/profile/update", editForm);
            setProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setUpdating(false);
        }
    };

    const openEditModal = () => {
        if (!profile) return;
        setEditForm({
            fullName: profile.fullName || "",
            bio: profile.bio || ""
        });
        setIsEditing(true);
    };

    if (loading) {
        return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto"></div></div>;
    }

    if (!profile) {
        return <div className="text-center py-20 text-surface-500">Profile not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in pb-20">
            {/* Profile Header Card */}
            <div className="rounded-3xl shadow-2xl bg-surface-100 border border-surface-200 overflow-hidden relative">
                {/* Cover Photo Placeholder */}
                <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-900 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-16 mb-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-surface-100 shadow-2xl bg-surface-200 flex items-center justify-center text-3xl font-bold text-surface-400 overflow-hidden">
                                {profile.profilePicture ? (
                                    <img
                                        src={getMediaUrl(profile.profilePicture)}
                                        alt={profile.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    profile.username.charAt(0).toUpperCase()
                                )}
                            </div>
                            {isOwnProfile && (
                                <label className="absolute bottom-1 right-1 bg-primary-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-primary-500 shadow-lg shadow-black/30 transition-all scale-90 group-hover:scale-110 hover:rotate-12">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureUpload}
                                        className="hidden"
                                    />
                                    <span className="text-sm">📷</span>
                                </label>
                            )}
                        </div>

                        {!isOwnProfile && (
                            <div className="flex space-x-3 mb-2">
                                <button
                                    onClick={handleMessageClick}
                                    className="px-6 py-2.5 bg-surface-200 border border-surface-300 text-white rounded-xl font-bold hover:bg-surface-300 hover:border-primary-500/30 transition-all shadow-sm"
                                >
                                    Message
                                </button>
                                <button
                                    onClick={profile.isFollowing ? handleUnfollow : handleFollow}
                                    className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg ${profile.isFollowing
                                        ? "bg-surface-200 text-surface-400 hover:bg-surface-300 hover:text-white"
                                        : "bg-primary-600 text-white hover:bg-primary-500 shadow-primary-500/30"
                                        }`}
                                >
                                    {profile.isFollowing ? "Unfollow" : "Follow"}
                                </button>
                            </div>
                        )}

                        {isOwnProfile && (
                            <button
                                onClick={openEditModal}
                                className="px-6 py-2.5 border border-surface-300 text-surface-300 rounded-xl font-bold hover:bg-surface-200 hover:text-white hover:border-surface-400 transition-all mb-2"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>


                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            {profile.fullName || profile.username}
                        </h1>
                        <p className="text-primary-500 font-bold tracking-wide">@{profile.username}</p>
                    </div>

                    {profile.bio && (
                        <p className="mt-4 text-surface-300 leading-relaxed max-w-2xl font-medium">
                            {profile.bio}
                        </p>
                    )}

                    <div className="flex space-x-8 mt-8 pt-6 border-t border-surface-200/50">
                        <div
                            className="flex items-center space-x-2 cursor-pointer hover:bg-surface-200/50 px-3 py-2 -ml-3 rounded-xl transition-all group"
                            onClick={() => fetchUserList('followers')}
                        >
                            <span className="text-xl font-black text-white group-hover:text-primary-400 transition-colors">{profile.followersCount}</span>
                            <span className="text-xs font-bold text-surface-500 uppercase tracking-widest mt-0.5">Followers</span>
                        </div>
                        <div
                            className="flex items-center space-x-2 cursor-pointer hover:bg-surface-200/50 px-3 py-2 rounded-xl transition-all group"
                            onClick={() => fetchUserList('following')}
                        >
                            <span className="text-xl font-black text-white group-hover:text-primary-400 transition-colors">{profile.followingCount}</span>
                            <span className="text-xs font-bold text-surface-500 uppercase tracking-widest mt-0.5">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center space-x-4 border-b border-surface-200 sticky top-0 bg-surface-50/95 backdrop-blur-md z-10 pt-4 pb-0">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`px-4 py-4 border-b-2 text-sm uppercase tracking-widest font-black transition-all ${activeTab === 'posts'
                            ? "border-primary-500 text-primary-500"
                            : "border-transparent text-surface-500 hover:text-white"
                            }`}
                    >
                        Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('media')}
                        className={`px-4 py-4 border-b-2 text-sm uppercase tracking-widest font-black transition-all ${activeTab === 'media'
                            ? "border-primary-500 text-primary-500"
                            : "border-transparent text-surface-500 hover:text-white"
                            }`}
                    >
                        Media
                    </button>
                    <button
                        onClick={() => setActiveTab('likes')}
                        className={`px-4 py-4 border-b-2 text-sm uppercase tracking-widest font-black transition-all ${activeTab === 'likes'
                            ? "border-primary-500 text-primary-500"
                            : "border-transparent text-surface-500 hover:text-white"
                            }`}
                    >
                        Likes
                    </button>
                </div>

                <div className="space-y-4">
                    {postsLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                            <p className="text-xs font-black text-surface-500 tracking-[0.2em] uppercase">Loading {activeTab}...</p>
                        </div>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onUpdate={(updated) => {
                                    setPosts((prev) => {
                                        // If we are on the likes tab and the post was unliked, remove it
                                        if (activeTab === 'likes' && !updated.isLiked) {
                                            return prev.filter(p => p.id !== updated.id);
                                        }
                                        // If we are on the media tab and media was removed (though unlikely via this UI)
                                        if (activeTab === 'media' && !updated.images?.length && !updated.videoUrl) {
                                            return prev.filter(p => p.id !== updated.id);
                                        }
                                        return prev.map((p) => (p.id === updated.id ? updated : p));
                                    });
                                }}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-surface-100 rounded-[2rem] border border-dashed border-surface-200">
                            <span className="text-5xl block mb-4 grayscale opacity-40">
                                {activeTab === 'posts' ? '📭' : activeTab === 'media' ? '🖼️' : '❤️'}
                            </span>
                            <p className="text-surface-400 font-bold text-lg">
                                {activeTab === 'posts' ? 'No posts yet' : activeTab === 'media' ? 'No media found' : 'No liked posts yet'}
                            </p>
                            <p className="text-surface-500 text-sm mt-1 font-medium italic">
                                {isOwnProfile ? "Time to share something with the world!" : `@${username} hasn't shared anything here.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for User List */}
            {modalConfig.isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div
                        className="relative bg-surface-100 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 border border-surface-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-surface-200 flex items-center justify-between bg-surface-100 sticky top-0">
                            <h3 className="text-lg font-black text-white tracking-tight">{modalConfig.title}</h3>
                            <button
                                onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                                className="p-2 hover:bg-surface-200 rounded-full transition-colors text-surface-400 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto px-2 py-2 bg-surface-100 scrollbar-thin scrollbar-thumb-surface-300">
                            {modalConfig.loading ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <div className="w-8 h-8 border-3 border-transparent border-t-primary-500 rounded-full animate-spin" />
                                    <p className="text-xs font-bold text-surface-500 tracking-widest uppercase">Loading...</p>
                                </div>
                            ) : modalConfig.users.length > 0 ? (
                                <div className="space-y-1">
                                    {modalConfig.users.map(user => (
                                        <div
                                            key={user.id}
                                            onClick={() => {
                                                setModalConfig(prev => ({ ...prev, isOpen: false }));
                                                router.push(`/profile/${user.username}`);
                                            }}
                                            className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-200 hover:shadow-md transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-full bg-surface-200 border-2 border-surface-300 shadow-sm overflow-hidden flex items-center justify-center text-primary-500 font-bold group-hover:border-primary-500/30 transition-colors">
                                                    {user.profilePicture ? (
                                                        <img
                                                            src={getMediaUrl(user.profilePicture)}
                                                            alt={user.username}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        user.username.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div className="space-y-0.5 min-w-0">
                                                    <p className="font-bold text-white group-hover:text-primary-400 transition-colors truncate">
                                                        {user.fullName || user.username}
                                                    </p>
                                                    <p className="text-xs text-surface-500 font-medium tracking-tight truncate">@{user.username}</p>
                                                </div>
                                            </div>
                                            <span className="text-surface-500 group-hover:text-primary-500 transition-colors mr-2">›</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 space-y-2">
                                    <span className="text-4xl block mb-2 grayscale opacity-30">👤</span>
                                    <p className="text-surface-500 font-bold">No {modalConfig.title.toLowerCase()} yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {isEditing && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setIsEditing(false)}
                >
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    <div
                        className="relative bg-surface-100 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-surface-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <form onSubmit={handleUpdateProfile} className="flex flex-col h-full">
                            <div className="px-8 py-6 border-b border-surface-200 flex items-center justify-between bg-surface-100/80 backdrop-blur-sm sticky top-0 z-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Edit Profile</h3>
                                    <p className="text-sm font-medium text-surface-400">Update your public information</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="p-2.5 hover:bg-surface-200 rounded-full transition-all text-surface-400 hover:text-white hover:rotate-90 duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-8 space-y-8 bg-surface-100">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-surface-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={editForm.fullName}
                                        onChange={e => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                                        className="w-full bg-surface-200 border border-surface-300 rounded-2xl px-6 py-4 text-white font-bold placeholder-surface-500 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all shadow-sm focus:shadow-lg"
                                        placeholder="Add your full name..."
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-surface-500 uppercase tracking-[0.2em] ml-1">Bio</label>
                                    <textarea
                                        value={editForm.bio}
                                        onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                        rows={4}
                                        className="w-full bg-surface-200 border border-surface-300 rounded-2xl px-6 py-4 text-white font-medium placeholder-surface-500 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all shadow-sm focus:shadow-lg resize-none"
                                        placeholder="Tell us a bit about yourself..."
                                    />
                                    <p className="text-[10px] text-surface-400 font-bold text-right mr-1 tracking-wider uppercase">
                                        {editForm.bio.length} / 160
                                    </p>
                                </div>
                            </div>

                            <div className="px-8 py-6 bg-surface-100 border-t border-surface-200 flex items-center justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-3.5 text-sm font-black text-surface-400 hover:text-white hover:bg-surface-200 rounded-2xl transition-all tracking-wider uppercase"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-10 py-3.5 bg-primary-600 text-white rounded-2xl font-black text-sm hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/20 active:scale-95 disabled:bg-surface-200 transition-all tracking-wider uppercase flex items-center space-x-2"
                                >
                                    {updating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>Save Changes</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
