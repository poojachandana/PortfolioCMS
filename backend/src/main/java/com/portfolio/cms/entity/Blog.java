package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "blogs")
public class Blog extends BaseEntity {

    @NotBlank
    private String title;

    @Column(unique = true)
    private String slug;

    @Column(length = 2000)
    private String excerpt;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    private String coverImageUrl;
    private String tags;          // comma separated
    private String author;

    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.DRAFT;
}
