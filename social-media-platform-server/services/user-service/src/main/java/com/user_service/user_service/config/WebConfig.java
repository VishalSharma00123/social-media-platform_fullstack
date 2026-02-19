package com.user_service.user_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String path = "file:" + uploadDir + "/";
        System.out.println("📂 Configuring Resource Handler: /files/** -> " + path);
        registry.addResourceHandler("/files/**")
                .addResourceLocations(path);
    }

    @jakarta.annotation.PostConstruct
    public void init() {
        System.out.println("✅ WebConfig Initialized with uploadDir: " + uploadDir);
        java.io.File dir = new java.io.File(uploadDir);
        System.out.println("   - Absolute Path: " + dir.getAbsolutePath());
        System.out.println("   - Exists: " + dir.exists());
        System.out.println("   - Directory: " + dir.isDirectory());
        System.out.println("   - Readable: " + dir.canRead());
    }
}