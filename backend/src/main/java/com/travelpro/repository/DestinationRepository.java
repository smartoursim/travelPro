package com.travelpro.repository;

import com.travelpro.entity.Destination;
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
public interface DestinationRepository extends JpaRepository<Destination, UUID> {

    Optional<Destination> findBySlug(String slug);

    List<Destination> findByIsFeaturedTrueAndIsActiveTrue();

    Page<Destination> findByIsActiveTrue(Pageable pageable);

    Page<Destination> findByCategoryAndIsActiveTrue(String category, Pageable pageable);

    @Query("SELECT d FROM Destination d WHERE d.isActive = true AND " +
           "(LOWER(d.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.city.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.city.state.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.city.state.country.name) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Destination> searchDestinations(@Param("query") String query, Pageable pageable);

    @Query("SELECT d FROM Destination d WHERE d.isActive = true AND " +
           "(:category IS NULL OR d.category = :category) AND " +
           "(:country IS NULL OR d.city.state.country.name = :country)")
    Page<Destination> findWithFilters(@Param("category") String category, 
                                    @Param("country") String country, 
                                    Pageable pageable);

    List<Destination> findTop6ByIsActiveOrderByRatingDesc(Boolean isActive);

    @Query("SELECT DISTINCT d.category FROM Destination d WHERE d.isActive = true ORDER BY d.category")
    List<String> findAllCategories();
}