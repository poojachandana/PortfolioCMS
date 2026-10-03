package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "testimonials")
public class Testimonial extends BaseEntity {

    @NotBlank
    private String authorName;

    private String authorRole;
    private String authorCompany;
    private String authorImageUrl;

    @Column(length = 3000)
    private String message;

    private Integer rating; // 1-5
    private Integer displayOrder = 0;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
