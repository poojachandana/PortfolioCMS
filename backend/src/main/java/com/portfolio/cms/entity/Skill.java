package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "skills")
public class Skill extends BaseEntity {

    @NotBlank
    private String name;

    private String category;      // e.g. "Frontend", "Backend", "Tools"
    private String iconUrl;

    @Column(name = "proficiency")
    private Integer proficiency;  // 0-100

    private Integer displayOrder = 0;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
