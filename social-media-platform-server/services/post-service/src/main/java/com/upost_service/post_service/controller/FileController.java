package com.upost_service.post_service.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Value;

@RestController
public class FileController {

    @Value("${upload.path:uploads}")
    private String uploadPath;

    @GetMapping("/uploads/{type}/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String type, @PathVariable String filename) {
        Path file = Path.of(uploadPath, type, filename);
        Resource resource = new org.springframework.core.io.FileSystemResource(file.toFile());
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }
        try {
            return ResponseEntity.ok()
                    .header("Content-Type", Files.probeContentType(file))
                    .body(resource);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
