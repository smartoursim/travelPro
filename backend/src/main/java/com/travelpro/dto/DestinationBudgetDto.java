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
public class DestinationBudgetDto {
    private UUID id;
    private String category;
    private String budgetType;
    private BigDecimal pricePerDay;
    private String currency;
    private String description;
}