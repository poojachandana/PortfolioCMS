package com.portfolio.cms.service;

import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.entity.Testimonial;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository repository;

    public List<Testimonial> findAllPublished() {
        return repository.findAll().stream()
                .filter(t -> t.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(Testimonial::getDisplayOrder))
                .toList();
    }

    public List<Testimonial> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Testimonial::getDisplayOrder))
                .toList();
    }

    public Testimonial findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found: " + id));
    }

    public Testimonial create(Testimonial t) {
        return repository.save(t);
    }

    public Testimonial update(Long id, Testimonial payload) {
        Testimonial existing = findById(id);
        existing.setAuthorName(payload.getAuthorName());
        existing.setAuthorRole(payload.getAuthorRole());
        existing.setAuthorCompany(payload.getAuthorCompany());
        existing.setAuthorImageUrl(payload.getAuthorImageUrl());
        existing.setMessage(payload.getMessage());
        existing.setRating(payload.getRating());
        existing.setDisplayOrder(payload.getDisplayOrder());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
