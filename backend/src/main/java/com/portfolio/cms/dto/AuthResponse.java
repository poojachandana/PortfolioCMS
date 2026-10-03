package com.portfolio.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private String email;
    private String name;
    private String role;

    public AuthResponse(String accessToken, String refreshToken, String email, String name, String role) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.email = email;
        this.name = name;
        this.role = role;
    }
}
