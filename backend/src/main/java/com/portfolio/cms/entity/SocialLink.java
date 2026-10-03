package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "social_links")
public class SocialLink extends BaseEntity {

    @NotBlank
    private String platform;   // GitHub, LinkedIn, Twitter, ...

    @NotBlank
    private String url;

    private String iconUrl;
    private Integer displayOrder = 0;
}
