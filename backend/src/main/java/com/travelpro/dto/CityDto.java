package com.travelpro.dto;

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
public class CityDto {
    private UUID id;
    private String name;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private StateDto state;
}