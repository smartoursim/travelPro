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
public class CountryDto {
    private UUID id;
    private String name;
    private String code;
    private String currency;
    private String language;
    private String timezone;
}