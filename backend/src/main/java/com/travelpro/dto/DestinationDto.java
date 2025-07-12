package com.travelpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDto {
    private UUID id;
    private String name;
    private String slug;
    private String category;
    private String description;
    private String shortDescription;
    private String mainImageUrl;
    private BigDecimal rating;
    private Integer reviewCount;
    private String bestTimeToVisit;
    private String recommendedDuration;
    private String difficultyLevel;
    private String history;
    private String culture;
    private String[] interestingFacts;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private CityDto city;
    private List<AttractionDto> attractions;
    private List<DestinationImageDto> images;
    private List<DestinationBudgetDto> budgets;
    private List<DestinationWeatherDto> weather;
}