package com.travelpro.repository;

import com.travelpro.entity.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, UUID> {
    
    Optional<BlogCategory> findBySlug(String slug);
    
    List<BlogCategory> findByIsActiveTrueOrderBySortOrder();
}