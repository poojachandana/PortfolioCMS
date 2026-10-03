package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Blog;
import com.portfolio.cms.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService service;

    @GetMapping
    public ResponseEntity<List<Blog>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Blog> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(service.findBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<Blog> create(@Valid @RequestBody Blog blog) {
        return ResponseEntity.status(201).body(service.create(blog));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable Long id, @Valid @RequestBody Blog blog) {
        return ResponseEntity.ok(service.update(id, blog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
