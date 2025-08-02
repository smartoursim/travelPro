package com.travelpro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class CreateDestinationRequest {
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Slug is required")
    private String slug;
    
    @NotNull(message = "City ID is required")
    private UUID cityId;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    private String shortDescription;
    private String mainImageUrl;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String difficultyLevel;
    private String accessibilityInfo;
    private String history;
    private String culture;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Boolean isFeatured = false;
}