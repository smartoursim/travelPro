package com.travelpro.dto;

import com.travelpro.entity.Attraction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttractionDto {
    private UUID id;
    private String name;
    private Attraction.AttractionType type;
    private String description;
    private String imageUrl;
    private String openingHours;
    private BigDecimal entryFee;
    private String visitDuration;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String bestTimeToVisit;
    private String tips;
}