package com.portfolio.cms.controller;

import com.portfolio.cms.entity.Testimonial;
import com.portfolio.cms.service.TestimonialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService service;

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAll(@RequestParam(defaultValue = "false") boolean all) {
        return ResponseEntity.ok(all ? service.findAllForAdmin() : service.findAllPublished());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Testimonial> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Testimonial> create(@Valid @RequestBody Testimonial t) {
        return ResponseEntity.status(201).body(service.create(t));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> update(@PathVariable Long id, @Valid @RequestBody Testimonial t) {
        return ResponseEntity.ok(service.update(id, t));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
