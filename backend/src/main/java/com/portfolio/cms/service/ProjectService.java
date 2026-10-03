package com.portfolio.cms.service;

import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.entity.Project;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;

    public List<Project> findAllPublished() {
        return repository.findAll().stream()
                .filter(p -> p.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(Project::getDisplayOrder))
                .toList();
    }

    public List<Project> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Project::getDisplayOrder))
                .toList();
    }

    public Project findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + id));
    }

    public Project create(Project project) {
        return repository.save(project);
    }

    public Project update(Long id, Project payload) {
        Project existing = findById(id);
        existing.setTitle(payload.getTitle());
        existing.setShortDescription(payload.getShortDescription());
        existing.setDescription(payload.getDescription());
        existing.setImageUrl(payload.getImageUrl());
        existing.setGithubUrl(payload.getGithubUrl());
        existing.setLiveUrl(payload.getLiveUrl());
        existing.setTechnologies(payload.getTechnologies());
        existing.setFeatured(payload.isFeatured());
        existing.setDisplayOrder(payload.getDisplayOrder());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
