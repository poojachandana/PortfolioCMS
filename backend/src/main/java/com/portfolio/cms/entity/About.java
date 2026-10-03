package com.portfolio.cms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "about")
public class About extends BaseEntity {

    private String fullName;
    private String title;

    @Column(length = 4000)
    private String bio;

    @Column(length = 4000)
    private String shortBio;

    private String profileImageUrl;
    private String resumeUrl;
    private String location;
    private String email;
    private String phone;

    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String websiteUrl;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
