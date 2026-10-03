package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Skill;
import com.portfolio.cms.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService service;

    @GetMapping
    public ResponseEntity<List<Skill>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Skill> create(@Valid @RequestBody Skill skill) {
        return ResponseEntity.status(201).body(service.create(skill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable Long id, @Valid @RequestBody Skill skill) {
        return ResponseEntity.ok(service.update(id, skill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
