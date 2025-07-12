package com.travelpro.mapper;

import com.travelpro.dto.BlogCategoryDto;
import com.travelpro.dto.BlogPostDto;
import com.travelpro.entity.BlogCategory;
import com.travelpro.entity.BlogPost;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlogMapper {

    BlogPostDto toDto(BlogPost blogPost);
    
    List<BlogPostDto> toPostDtoList(List<BlogPost> blogPosts);

    BlogCategoryDto toDto(BlogCategory blogCategory);
    
    List<BlogCategoryDto> toCategoryDtoList(List<BlogCategory> blogCategories);
}