package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

    @NotBlank
    private String title;

    @Column(length = 1000)
    private String shortDescription;

    @Column(length = 8000)
    private String description;

    private String imageUrl;
    private String githubUrl;
    private String liveUrl;

    @ElementCollection
    @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> technologies = new ArrayList<>();

    private boolean featured = false;
    private Integer displayOrder = 0;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
