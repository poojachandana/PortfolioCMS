package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "services")
public class ServiceOffering extends BaseEntity {

    @NotBlank
    private String title;

    @Column(length = 2000)
    private String description;

    private String iconUrl;
    private Integer displayOrder = 0;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
}
