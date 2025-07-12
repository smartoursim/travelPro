package com.travelpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DestinationWeatherDto {
    private UUID id;
    private Integer month;
    private Integer minTemperature;
    private Integer maxTemperature;
    private Integer rainfall;
    private Integer humidity;
    private String weatherDescription;
    private String[] clothingRecommendations;
    private String[] activitiesRecommended;
    private String[] travelTips;
}