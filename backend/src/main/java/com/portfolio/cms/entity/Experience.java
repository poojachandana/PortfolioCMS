package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "experience")
public class Experience extends BaseEntity {

    @NotBlank
    private String company;

    @NotBlank
    private String role;

    private String location;
    private LocalDate startDate;
    private LocalDate endDate;     // null = present
    private boolean current = false;

    @Column(length = 4000)
    private String description;

    private String companyLogoUrl;
    private Integer displayOrder = 0;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
