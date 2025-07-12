package com.travelpro.controller;

import com.travelpro.dto.BlogCategoryDto;
import com.travelpro.dto.BlogPostDto;
import com.travelpro.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/blog")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Blog", description = "Blog management APIs")
public class BlogController {

    private final BlogService blogService;

    @GetMapping("/posts")
    @Operation(summary = "Get all blog posts", description = "Retrieve paginated list of published blog posts")
    public ResponseEntity<Page<BlogPostDto>> getAllBlogPosts(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "publishedAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.info("GET /blog/posts - page: {}, size: {}, sortBy: {}, sortDir: {}", page, size, sortBy, sortDir);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<BlogPostDto> posts = blogService.getAllBlogPosts(pageable);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{slug}")
    @Operation(summary = "Get blog post by slug", description = "Retrieve a specific blog post by its slug")
    public ResponseEntity<BlogPostDto> getBlogPostBySlug(
            @Parameter(description = "Blog post slug") @PathVariable String slug) {
        
        log.info("GET /blog/posts/{}", slug);
        
        return blogService.getBlogPostBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/posts/featured")
    @Operation(summary = "Get featured blog posts", description = "Retrieve list of featured blog posts")
    public ResponseEntity<List<BlogPostDto>> getFeaturedBlogPosts() {
        log.info("GET /blog/posts/featured");
        
        List<BlogPostDto> posts = blogService.getFeaturedBlogPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/search")
    @Operation(summary = "Search blog posts", description = "Search blog posts by query string")
    public ResponseEntity<Page<BlogPostDto>> searchBlogPosts(
            @Parameter(description = "Search query") @RequestParam String q,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "publishedAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.info("GET /blog/posts/search - query: {}, page: {}, size: {}", q, page, size);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<BlogPostDto> posts = blogService.searchBlogPosts(q, pageable);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/category/{categoryId}")
    @Operation(summary = "Get blog posts by category", description = "Retrieve blog posts filtered by category")
    public ResponseEntity<Page<BlogPostDto>> getBlogPostsByCategory(
            @Parameter(description = "Category ID") @PathVariable UUID categoryId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "publishedAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.info("GET /blog/posts/category/{} - page: {}, size: {}", categoryId, page, size);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<BlogPostDto> posts = blogService.getBlogPostsByCategory(categoryId, pageable);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/categories")
    @Operation(summary = "Get all blog categories", description = "Retrieve list of all blog categories")
    public ResponseEntity<List<BlogCategoryDto>> getAllCategories() {
        log.info("GET /blog/categories");
        
        List<BlogCategoryDto> categories = blogService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/categories/{slug}")
    @Operation(summary = "Get blog category by slug", description = "Retrieve a specific blog category by its slug")
    public ResponseEntity<BlogCategoryDto> getCategoryBySlug(
            @Parameter(description = "Category slug") @PathVariable String slug) {
        
        log.info("GET /blog/categories/{}", slug);
        
        return blogService.getCategoryBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}