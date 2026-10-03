package com.portfolio.cms.service;

import com.portfolio.cms.entity.SocialLink;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.SocialLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialLinkService {

    private final SocialLinkRepository repository;

    public List<SocialLink> findAll() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(SocialLink::getDisplayOrder))
                .toList();
    }

    public SocialLink findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Social link not found: " + id));
    }

    public SocialLink create(SocialLink s) {
        return repository.save(s);
    }

    public SocialLink update(Long id, SocialLink payload) {
        SocialLink existing = findById(id);
        existing.setPlatform(payload.getPlatform());
        existing.setUrl(payload.getUrl());
        existing.setIconUrl(payload.getIconUrl());
        existing.setDisplayOrder(payload.getDisplayOrder());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
