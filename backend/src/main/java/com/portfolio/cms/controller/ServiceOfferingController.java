package com.portfolio.cms.controller;

import com.portfolio.cms.entity.ServiceOffering;
import com.portfolio.cms.service.ServiceOfferingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceOfferingController {

    private final ServiceOfferingService service;

    @GetMapping
    public ResponseEntity<List<ServiceOffering>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOffering> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ServiceOffering> create(@Valid @RequestBody ServiceOffering s) {
        return ResponseEntity.status(201).body(service.create(s));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOffering> update(@PathVariable Long id, @Valid @RequestBody ServiceOffering s) {
        return ResponseEntity.ok(service.update(id, s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
