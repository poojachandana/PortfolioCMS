package com.portfolio.cms.service;

import com.portfolio.cms.entity.Blog;
import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository repository;

    public List<Blog> findAllPublished() {
        return repository.findAll().stream()
                .filter(b -> b.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(Blog::getCreatedAt).reversed())
                .toList();
    }

    public List<Blog> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Blog::getCreatedAt).reversed())
                .toList();
    }

    public Blog findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found: " + id));
    }

    public Blog findBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found: " + slug));
    }

    public Blog create(Blog blog) {
        if (blog.getSlug() == null || blog.getSlug().isBlank()) {
            blog.setSlug(slugify(blog.getTitle()));
        }
        ensureUniqueSlug(blog, null);
        return repository.save(blog);
    }

    public Blog update(Long id, Blog payload) {
        Blog existing = findById(id);
        existing.setTitle(payload.getTitle());
        String newSlug = (payload.getSlug() == null || payload.getSlug().isBlank())
                ? slugify(payload.getTitle())
                : payload.getSlug();
        existing.setSlug(newSlug);
        ensureUniqueSlug(existing, id);
        existing.setExcerpt(payload.getExcerpt());
        existing.setContent(payload.getContent());
        existing.setCoverImageUrl(payload.getCoverImageUrl());
        existing.setTags(payload.getTags());
        existing.setAuthor(payload.getAuthor());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }

    private String slugify(String title) {
        if (title == null) return "post-" + System.currentTimeMillis();
        return title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .trim()
                .replaceAll("\\s+", "-");
    }

    private void ensureUniqueSlug(Blog blog, Long ignoreId) {
        String base = blog.getSlug();
        String candidate = base;
        int counter = 1;
        while (repository.findBySlug(candidate)
                .filter(existing -> !existing.getId().equals(ignoreId))
                .isPresent()) {
            candidate = base + "-" + counter++;
        }
        blog.setSlug(candidate);
    }
}
