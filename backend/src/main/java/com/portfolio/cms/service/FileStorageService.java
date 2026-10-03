package com.portfolio.cms.service;

import com.portfolio.cms.entity.Media;
import com.portfolio.cms.repository.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final MediaRepository mediaRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
            "application/pdf"
    );

    public Media storeFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file");
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Unsupported file type: " + contentType);
        }

        try {
            Path dirPath = Paths.get(uploadDir);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }

            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID() + extension;
            Path targetPath = dirPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            Media media = new Media();
            media.setFileName(fileName);
            media.setOriginalName(originalName);
            media.setUrl("/uploads/" + fileName);
            media.setContentType(contentType);
            media.setSizeBytes(file.getSize());

            return mediaRepository.save(media);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
        }
    }

    public List<Media> listAll() {
        return mediaRepository.findAll();
    }

    public void delete(Long id) {
        Media media = mediaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Media not found: " + id));
        try {
            Path filePath = Paths.get(uploadDir).resolve(media.getFileName());
            Files.deleteIfExists(filePath);
        } catch (IOException ignored) {
            // file already gone from disk - still remove the DB record
        }
        mediaRepository.delete(media);
    }
}
