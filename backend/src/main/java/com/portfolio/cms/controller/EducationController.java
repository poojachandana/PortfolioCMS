package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Education;
import com.portfolio.cms.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService service;

    @GetMapping
    public ResponseEntity<List<Education>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Education> create(@Valid @RequestBody Education education) {
        return ResponseEntity.status(201).body(service.create(education));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> update(@PathVariable Long id, @Valid @RequestBody Education education) {
        return ResponseEntity.ok(service.update(id, education));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
