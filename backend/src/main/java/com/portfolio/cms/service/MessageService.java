package com.portfolio.cms.service;

import com.portfolio.cms.entity.Message;
import com.portfolio.cms.exception.ResourceNotFoundException;
import com.portfolio.cms.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final EmailService emailService;

    public Message submit(Message message) {
        Message saved = repository.save(message);
        emailService.sendContactNotification(saved);
        return saved;
    }

    public List<Message> findAll() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(Message::getCreatedAt).reversed())
                .toList();
    }

    public Message findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
    }

    public Message markRead(Long id, boolean read) {
        Message message = findById(id);
        message.setRead(read);
        return repository.save(message);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}
