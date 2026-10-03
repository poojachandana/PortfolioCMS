package com.portfolio.cms.controller;

import com.portfolio.cms.dto.MessageResponse;
import com.portfolio.cms.entity.Message;
import com.portfolio.cms.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService service;

    // Public: anyone can submit the contact form
    @PostMapping("/contact")
    public ResponseEntity<MessageResponse> submit(@Valid @RequestBody Message message) {
        service.submit(message);
        return ResponseEntity.status(201).body(new MessageResponse("Thanks for reaching out! I'll get back to you soon."));
    }

    // Protected: admin inbox
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PatchMapping("/messages/{id}/read")
    public ResponseEntity<Message> markRead(@PathVariable Long id, @RequestParam(defaultValue = "true") boolean read) {
        return ResponseEntity.ok(service.markRead(id, read));
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
