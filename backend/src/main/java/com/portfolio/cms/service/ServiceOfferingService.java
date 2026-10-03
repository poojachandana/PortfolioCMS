package com.portfolio.cms.service;

import com.portfolio.cms.entity.ContentStatus;
import com.portfolio.cms.entity.ServiceOffering;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.ServiceOfferingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceOfferingService {

    private final ServiceOfferingRepository repository;

    public List<ServiceOffering> findAllPublished() {
        return repository.findAll().stream()
                .filter(s -> s.getStatus() == ContentStatus.PUBLISHED)
                .sorted(Comparator.comparing(ServiceOffering::getDisplayOrder))
                .toList();
    }

    public List<ServiceOffering> findAllForAdmin() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(ServiceOffering::getDisplayOrder))
                .toList();
    }

    public ServiceOffering findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + id));
    }

    public ServiceOffering create(ServiceOffering s) {
        return repository.save(s);
    }

    public ServiceOffering update(Long id, ServiceOffering payload) {
        ServiceOffering existing = findById(id);
        existing.setTitle(payload.getTitle());
        existing.setDescription(payload.getDescription());
        existing.setIconUrl(payload.getIconUrl());
        existing.setDisplayOrder(payload.getDisplayOrder());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
