package com.travelpro.service;

import com.travelpro.dto.BlogCategoryDto;
import com.travelpro.dto.BlogPostDto;
import com.travelpro.entity.BlogPost;
import com.travelpro.mapper.BlogMapper;
import com.travelpro.repository.BlogCategoryRepository;
import com.travelpro.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class BlogService {

    private final BlogPostRepository blogPostRepository;
    private final BlogCategoryRepository blogCategoryRepository;
    private final BlogMapper blogMapper;

    @Cacheable(value = "blogPosts", key = "#pageable.pageNumber + '_' + #pageable.pageSize")
    public Page<BlogPostDto> getAllBlogPosts(Pageable pageable) {
        log.debug("Fetching all blog posts with pagination: {}", pageable);
        Page<BlogPost> posts = blogPostRepository.findByIsPublishedTrueOrderByPublishedAtDesc(pageable);
        return posts.map(blogMapper::toDto);
    }

    @Cacheable(value = "blogPost", key = "#slug")
    public Optional<BlogPostDto> getBlogPostBySlug(String slug) {
        log.debug("Fetching blog post by slug: {}", slug);
        return blogPostRepository.findBySlug(slug)
                .map(blogMapper::toDto);
    }

    @Cacheable(value = "featuredBlogPosts")
    public List<BlogPostDto> getFeaturedBlogPosts() {
        log.debug("Fetching featured blog posts");
        List<BlogPost> posts = blogPostRepository.findByIsFeaturedTrueAndIsPublishedTrueOrderByPublishedAtDesc();
        return blogMapper.toPostDtoList(posts);
    }

    public Page<BlogPostDto> searchBlogPosts(String query, Pageable pageable) {
        log.debug("Searching blog posts with query: {}", query);
        Page<BlogPost> posts = blogPostRepository.searchBlogPosts(query, pageable);
        return posts.map(blogMapper::toDto);
    }

    public Page<BlogPostDto> getBlogPostsByCategory(UUID categoryId, Pageable pageable) {
        log.debug("Fetching blog posts by category: {}", categoryId);
        Page<BlogPost> posts = blogPostRepository.findByCategoryIdAndIsPublishedTrueOrderByPublishedAtDesc(categoryId, pageable);
        return posts.map(blogMapper::toDto);
    }

    @Cacheable(value = "blogCategories")
    public List<BlogCategoryDto> getAllCategories() {
        log.debug("Fetching all blog categories");
        return blogMapper.toCategoryDtoList(blogCategoryRepository.findByIsActiveTrueOrderBySortOrder());
    }

    @Cacheable(value = "blogCategory", key = "#slug")
    public Optional<BlogCategoryDto> getCategoryBySlug(String slug) {
        log.debug("Fetching blog category by slug: {}", slug);
        return blogCategoryRepository.findBySlug(slug)
                .map(blogMapper::toDto);
    }
}