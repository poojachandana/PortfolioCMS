package com.portfolio.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
    private Map<String, String> fieldErrors;

    public ApiError(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public ApiError(int status, String message, Map<String, String> fieldErrors) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.fieldErrors = fieldErrors;
    }
}
