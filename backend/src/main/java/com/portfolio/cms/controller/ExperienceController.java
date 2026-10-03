package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Experience;
import com.portfolio.cms.service.ExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService service;

    @GetMapping
    public ResponseEntity<List<Experience>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experience> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Experience> create(@Valid @RequestBody Experience experience) {
        return ResponseEntity.status(201).body(service.create(experience));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> update(@PathVariable Long id, @Valid @RequestBody Experience experience) {
        return ResponseEntity.ok(service.update(id, experience));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
