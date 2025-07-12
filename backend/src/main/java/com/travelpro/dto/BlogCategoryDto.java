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
public class BlogCategoryDto {
    private UUID id;
    private String name;
    private String slug;
    private String description;
    private Integer sortOrder;
}