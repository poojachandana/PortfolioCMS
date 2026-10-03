package com.portfolio.cms.controller;

import com.portfolio.cms.entity.About;
import com.portfolio.cms.service.AboutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
public class AboutController {

    private final AboutService service;

    @GetMapping
    public ResponseEntity<About> get() {
        return ResponseEntity.ok(service.get());
    }

    @PutMapping
    public ResponseEntity<About> update(@Valid @RequestBody About about) {
        return ResponseEntity.ok(service.update(about));
    }
}
