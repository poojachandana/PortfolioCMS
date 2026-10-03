package com.portfolio.cms.service;

import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.entity.Skill;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository repository;

    public List<Skill> findAllPublished() {
        return repository.findAll().stream()
                .filter(s -> s.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(Skill::getDisplayOrder))
                .toList();
    }

    public List<Skill> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Skill::getDisplayOrder))
                .toList();
    }

    public Skill findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found: " + id));
    }

    public Skill create(Skill skill) {
        return repository.save(skill);
    }

    public Skill update(Long id, Skill payload) {
        Skill existing = findById(id);
        existing.setName(payload.getName());
        existing.setCategory(payload.getCategory());
        existing.setIconUrl(payload.getIconUrl());
        existing.setProficiency(payload.getProficiency());
        existing.setDisplayOrder(payload.getDisplayOrder());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
