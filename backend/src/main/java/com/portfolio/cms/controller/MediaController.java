package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Media;
import com.portfolio.cms.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {

    private final FileStorageService fileStorageService;

    // Protected: only authenticated admins may upload
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<Media> upload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.status(201).body(fileStorageService.storeFile(file));
    }

    @GetMapping
    public ResponseEntity<List<Media>> getAll() {
        return ResponseEntity.ok(fileStorageService.listAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fileStorageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
