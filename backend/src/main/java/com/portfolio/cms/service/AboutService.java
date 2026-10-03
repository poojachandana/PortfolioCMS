package com.portfolio.cms.service;

import com.portfolio.cms.entity.About;
import com.portfolio.cms.repository.AboutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * About is a "singleton" content type - there is only ever one About record,
 * representing the portfolio owner's profile.
 */
@Service
@RequiredArgsConstructor
public class AboutService {

    private final AboutRepository repository;

    public About get() {
        return repository.findAll().stream().findFirst().orElseGet(() -> {
            About about = new About();
            about.setFullName("Your Name");
            about.setTitle("Full Stack Developer");
            about.setShortBio("Welcome to my portfolio - edit this in the CMS admin panel.");
            return repository.save(about);
        });
    }

    public About update(About payload) {
        About existing = get();
        existing.setFullName(payload.getFullName());
        existing.setTitle(payload.getTitle());
        existing.setBio(payload.getBio());
        existing.setShortBio(payload.getShortBio());
        existing.setProfileImageUrl(payload.getProfileImageUrl());
        existing.setResumeUrl(payload.getResumeUrl());
        existing.setLocation(payload.getLocation());
        existing.setEmail(payload.getEmail());
        existing.setPhone(payload.getPhone());
        existing.setGithubUrl(payload.getGithubUrl());
        existing.setLinkedinUrl(payload.getLinkedinUrl());
        existing.setTwitterUrl(payload.getTwitterUrl());
        existing.setWebsiteUrl(payload.getWebsiteUrl());
        existing.setStatus(payload.getStatus());
        return repository.save(existing);
    }
}
