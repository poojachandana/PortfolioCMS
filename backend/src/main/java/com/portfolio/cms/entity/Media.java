package com.portfolio.cms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "media")
public class Media extends BaseEntity {

    private String fileName;
    private String originalName;
    private String url;
    private String contentType;
    private Long sizeBytes;
}
