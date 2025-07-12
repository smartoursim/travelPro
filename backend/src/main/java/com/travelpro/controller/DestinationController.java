package com.travelpro.controller;

import com.travelpro.dto.DestinationDto;
import com.travelpro.service.DestinationService;
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
@RequestMapping("/destinations")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Destinations", description = "Destination management APIs")
public class DestinationController {

    private final DestinationService destinationService;

    @GetMapping
    @Operation(summary = "Get all destinations", description = "Retrieve paginated list of all active destinations")
    public ResponseEntity<Page<DestinationDto>> getAllDestinations(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "name") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("GET /destinations - page: {}, size: {}, sortBy: {}, sortDir: {}", page, size, sortBy, sortDir);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<DestinationDto> destinations = destinationService.getAllDestinations(pageable);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get destination by ID", description = "Retrieve a specific destination by its ID")
    public ResponseEntity<DestinationDto> getDestinationById(
            @Parameter(description = "Destination ID") @PathVariable UUID id) {
        
        log.info("GET /destinations/{}", id);
        
        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get destination by slug", description = "Retrieve a specific destination by its slug")
    public ResponseEntity<DestinationDto> getDestinationBySlug(
            @Parameter(description = "Destination slug") @PathVariable String slug) {
        
        log.info("GET /destinations/slug/{}", slug);
        
        return destinationService.getDestinationBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured destinations", description = "Retrieve list of featured destinations")
    public ResponseEntity<List<DestinationDto>> getFeaturedDestinations() {
        log.info("GET /destinations/featured");
        
        List<DestinationDto> destinations = destinationService.getFeaturedDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/top")
    @Operation(summary = "Get top destinations", description = "Retrieve top-rated destinations")
    public ResponseEntity<List<DestinationDto>> getTopDestinations() {
        log.info("GET /destinations/top");
        
        List<DestinationDto> destinations = destinationService.getTopDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/search")
    @Operation(summary = "Search destinations", description = "Search destinations by query string")
    public ResponseEntity<Page<DestinationDto>> searchDestinations(
            @Parameter(description = "Search query") @RequestParam String q,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "name") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("GET /destinations/search - query: {}, page: {}, size: {}", q, page, size);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<DestinationDto> destinations = destinationService.searchDestinations(q, pageable);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get destinations by category", description = "Retrieve destinations filtered by category")
    public ResponseEntity<Page<DestinationDto>> getDestinationsByCategory(
            @Parameter(description = "Destination category") @PathVariable String category,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "name") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("GET /destinations/category/{} - page: {}, size: {}", category, page, size);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<DestinationDto> destinations = destinationService.getDestinationsByCategory(category, pageable);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter destinations", description = "Filter destinations by multiple criteria")
    public ResponseEntity<Page<DestinationDto>> filterDestinations(
            @Parameter(description = "Category filter") @RequestParam(required = false) String category,
            @Parameter(description = "Country filter") @RequestParam(required = false) String country,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "name") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "asc") String sortDir) {
        
        log.info("GET /destinations/filter - category: {}, country: {}, page: {}, size: {}", 
                category, country, page, size);
        
        Page<DestinationDto> destinations = destinationService.getDestinationsWithFilters(
                category, country, page, size, sortBy, sortDir);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/categories")
    @Operation(summary = "Get all categories", description = "Retrieve list of all destination categories")
    public ResponseEntity<List<String>> getAllCategories() {
        log.info("GET /destinations/categories");
        
        List<String> categories = destinationService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}