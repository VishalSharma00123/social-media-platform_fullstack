package com.upost_service.post_service.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    // Base directory to store files, configure via application.properties
    @Value("${upload.path:uploads}")
    private String uploadDir;

    // Save image file and return relative URL/path
    public String saveImage(MultipartFile file) {
        log.info("Saving image file: name={}, size={} bytes, type={}",
                file.getOriginalFilename(), file.getSize(), file.getContentType());
        return saveFile(file, "images");
    }

    // Save video file and return relative URL/path
    public String saveVideo(MultipartFile file) {
        log.info("Saving video file: name={}, size={} bytes, type={}",
                file.getOriginalFilename(), file.getSize(), file.getContentType());
        return saveFile(file, "videos");
    }

    // General method to save file in subfolder and return URL
    private String saveFile(MultipartFile file, String subfolder) {
        try {
            String ext = getFileExtension(file.getOriginalFilename());
            String uniqueName = UUID.randomUUID().toString() + (ext.isEmpty() ? "" : "." + ext);

            Path dir = Path.of(uploadDir, subfolder);
            Files.createDirectories(dir);

            Path filePath = dir.resolve(uniqueName);

            log.debug("Storing file at path: {}", filePath.toAbsolutePath());

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String relativePath = "/uploads/" + subfolder + "/" + uniqueName;
            log.info("File stored successfully: {}", relativePath);

            return relativePath;

        } catch (IOException e) {
            log.error("Failed to store file: name={}, subfolder={}",
                    file.getOriginalFilename(), subfolder, e);
            throw new RuntimeException("Could not store file " + file.getOriginalFilename(), e);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            log.warn("Filename is null, cannot determine file extension");
            return "";
        }
        int idx = filename.lastIndexOf(".");
        return (idx > 0) ? filename.substring(idx + 1) : "";
    }
}
