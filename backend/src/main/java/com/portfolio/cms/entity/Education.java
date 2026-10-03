package com.portfolio.cms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "education")
public class Education extends BaseEntity {

    private String institution;
    private String degree;
    private String fieldOfStudy;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private Integer displayOrder = 0;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
