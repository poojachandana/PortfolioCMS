package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Project;
import com.portfolio.cms.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    @GetMapping
    public ResponseEntity<List<Project>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Project> create(@Valid @RequestBody Project project) {
        return ResponseEntity.status(201).body(service.create(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id, @Valid @RequestBody Project project) {
        return ResponseEntity.ok(service.update(id, project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
