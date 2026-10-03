package com.portfolio.cms.service;

import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.entity.Education;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository repository;

    public List<Education> findAllPublished() {
        return repository.findAll().stream()
                .filter(e -> e.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(Education::getDisplayOrder))
                .toList();
    }

    public List<Education> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Education::getDisplayOrder))
                .toList();
    }

    public Education findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found: " + id));
    }

    public Education create(Education e) {
        return repository.save(e);
    }

    public Education update(Long id, Education payload) {
        Education existing = findById(id);
        existing.setInstitution(payload.getInstitution());
        existing.setDegree(payload.getDegree());
        existing.setFieldOfStudy(payload.getFieldOfStudy());
        existing.setStartDate(payload.getStartDate());
        existing.setEndDate(payload.getEndDate());
        existing.setDescription(payload.getDescription());
        existing.setDisplayOrder(payload.getDisplayOrder());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
