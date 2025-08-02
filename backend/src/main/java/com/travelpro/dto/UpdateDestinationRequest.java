package com.travelpro.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateDestinationRequest {
    private String name;
    private String category;
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
    private Boolean isFeatured;
    private Boolean isActive;
}