package com.travelpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostDto {
    private UUID id;
    private String title;
    private String slug;
    private String excerpt;
    private String content;
    private String authorName;
    private String featuredImageUrl;
    private Integer readTime;
    private String[] tags;
    private Boolean isPublished;
    private Boolean isFeatured;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private BlogCategoryDto category;
}