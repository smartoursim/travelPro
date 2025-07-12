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
public class DestinationImageDto {
    private UUID id;
    private String imageUrl;
    private String caption;
    private String altText;
    private Boolean isPrimary;
    private Integer sortOrder;
}