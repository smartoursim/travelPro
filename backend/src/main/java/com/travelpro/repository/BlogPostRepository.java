package com.travelpro.repository;

import com.travelpro.entity.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {

    Optional<BlogPost> findBySlug(String slug);

    Page<BlogPost> findByIsPublishedTrueOrderByPublishedAtDesc(Pageable pageable);

    Page<BlogPost> findByCategoryIdAndIsPublishedTrueOrderByPublishedAtDesc(UUID categoryId, Pageable pageable);

    List<BlogPost> findByIsFeaturedTrueAndIsPublishedTrueOrderByPublishedAtDesc();

    @Query("SELECT b FROM BlogPost b WHERE b.isPublished = true AND " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.content) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<BlogPost> searchBlogPosts(@Param("query") String query, Pageable pageable);

    @Query("SELECT b FROM BlogPost b WHERE b.isPublished = true AND " +
           "(:categoryId IS NULL OR b.category.id = :categoryId)")
    Page<BlogPost> findWithFilters(@Param("categoryId") UUID categoryId, Pageable pageable);
}