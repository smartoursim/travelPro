package com.travelpro.service;

import com.travelpro.dto.DestinationDto;
import com.travelpro.entity.Destination;
import com.travelpro.mapper.DestinationMapper;
import com.travelpro.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DestinationService {

    private final DestinationRepository destinationRepository;
    private final DestinationMapper destinationMapper;

    @Cacheable(value = "destinations", key = "#pageable.pageNumber + '_' + #pageable.pageSize + '_' + #pageable.sort")
    public Page<DestinationDto> getAllDestinations(Pageable pageable) {
        log.debug("Fetching all destinations with pagination: {}", pageable);
        Page<Destination> destinations = destinationRepository.findByIsActiveTrue(pageable);
        return destinations.map(destinationMapper::toDto);
    }

    @Cacheable(value = "destination", key = "#slug")
    public Optional<DestinationDto> getDestinationBySlug(String slug) {
        log.debug("Fetching destination by slug: {}", slug);
        return destinationRepository.findBySlug(slug)
                .map(destinationMapper::toDto);
    }

    @Cacheable(value = "destination", key = "#id")
    public Optional<DestinationDto> getDestinationById(UUID id) {
        log.debug("Fetching destination by id: {}", id);
        return destinationRepository.findById(id)
                .map(destinationMapper::toDto);
    }

    @Cacheable(value = "featuredDestinations")
    public List<DestinationDto> getFeaturedDestinations() {
        log.debug("Fetching featured destinations");
        List<Destination> destinations = destinationRepository.findByIsFeaturedTrueAndIsActiveTrue();
        return destinationMapper.toDtoList(destinations);
    }

    @Cacheable(value = "topDestinations")
    public List<DestinationDto> getTopDestinations() {
        log.debug("Fetching top destinations");
        List<Destination> destinations = destinationRepository.findTop6ByIsActiveOrderByRatingDesc(true);
        return destinationMapper.toDtoList(destinations);
    }

    public Page<DestinationDto> searchDestinations(String query, Pageable pageable) {
        log.debug("Searching destinations with query: {}", query);
        Page<Destination> destinations = destinationRepository.searchDestinations(query, pageable);
        return destinations.map(destinationMapper::toDto);
    }

    public Page<DestinationDto> getDestinationsByCategory(String category, Pageable pageable) {
        log.debug("Fetching destinations by category: {}", category);
        Page<Destination> destinations = destinationRepository.findByCategoryAndIsActiveTrue(category, pageable);
        return destinations.map(destinationMapper::toDto);
    }

    public Page<DestinationDto> getDestinationsWithFilters(String category, String country, 
                                                          int page, int size, String sortBy, String sortDir) {
        log.debug("Fetching destinations with filters - category: {}, country: {}", category, country);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Destination> destinations = destinationRepository.findWithFilters(category, country, pageable);
        return destinations.map(destinationMapper::toDto);
    }

    @Cacheable(value = "destinationCategories")
    public List<String> getAllCategories() {
        log.debug("Fetching all destination categories");
        return destinationRepository.findAllCategories();
    }
}