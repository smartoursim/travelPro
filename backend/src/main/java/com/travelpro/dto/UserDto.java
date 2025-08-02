package com.travelpro.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate dateOfBirth;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private Boolean isActive;
    private Boolean emailVerified;
}