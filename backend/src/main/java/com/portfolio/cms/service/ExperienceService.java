package com.portfolio.cms.service;

import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.entity.Experience;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository repository;

    public List<Experience> findAllPublished() {
        return repository.findAll().stream()
                .filter(e -> e.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(Experience::getDisplayOrder))
                .toList();
    }

    public List<Experience> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Experience::getDisplayOrder))
                .toList();
    }

    public Experience findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found: " + id));
    }

    public Experience create(Experience e) {
        return repository.save(e);
    }

    public Experience update(Long id, Experience payload) {
        Experience existing = findById(id);
        existing.setCompany(payload.getCompany());
        existing.setRole(payload.getRole());
        existing.setLocation(payload.getLocation());
        existing.setStartDate(payload.getStartDate());
        existing.setEndDate(payload.getEndDate());
        existing.setCurrent(payload.isCurrent());
        existing.setDescription(payload.getDescription());
        existing.setCompanyLogoUrl(payload.getCompanyLogoUrl());
        existing.setDisplayOrder(payload.getDisplayOrder());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
