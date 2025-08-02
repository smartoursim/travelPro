package com.travelpro.mapper;

import com.travelpro.dto.RegisterRequest;
import com.travelpro.dto.UserDto;
import com.travelpro.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhone());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setProfileImageUrl(user.getProfileImageUrl());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLogin(user.getLastLogin());
        dto.setIsActive(user.getIsActive());
        dto.setEmailVerified(user.getEmailVerified());
        return dto;
    }
    
    public User toEntity(RegisterRequest request) {
        return User.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .build();
    }
}