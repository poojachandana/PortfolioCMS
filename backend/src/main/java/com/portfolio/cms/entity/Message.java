package com.portfolio.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "messages")
public class Message extends BaseEntity {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    private String subject;

    @Column(length = 4000)
    private String body;

    private boolean read = false;
}
