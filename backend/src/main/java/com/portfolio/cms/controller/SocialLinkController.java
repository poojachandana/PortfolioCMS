package com.portfolio.cms.controller;

import com.portfolio.cms.entity.SocialLink;
import com.portfolio.cms.service.SocialLinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/social-links")
@RequiredArgsConstructor
public class SocialLinkController {

    private final SocialLinkService service;

    @GetMapping
    public ResponseEntity<List<SocialLink>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<SocialLink> create(@Valid @RequestBody SocialLink s) {
        return ResponseEntity.status(201).body(service.create(s));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SocialLink> update(@PathVariable Long id, @Valid @RequestBody SocialLink s) {
        return ResponseEntity.ok(service.update(id, s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
