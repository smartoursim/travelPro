package com.travelpro.service;

import com.travelpro.dto.CreateDestinationRequest;
import com.travelpro.dto.DestinationDto;
import com.travelpro.dto.UpdateDestinationRequest;
import com.travelpro.entity.City;
import com.travelpro.entity.Destination;
import com.travelpro.exception.ResourceNotFoundException;
import com.travelpro.mapper.DestinationMapper;
import com.travelpro.repository.CityRepository;
import com.travelpro.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminDestinationService {

    private final DestinationRepository destinationRepository;
    private final CityRepository cityRepository;
    private final DestinationMapper destinationMapper;

    @Transactional
    public DestinationDto createDestination(CreateDestinationRequest request) {
        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("City not found with id: " + request.getCityId()));
        
        Destination destination = Destination.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .city(city)
                .category(request.getCategory())
                .description(request.getDescription())
                .shortDescription(request.getShortDescription())
                .mainImageUrl(request.getMainImageUrl())
                .bestTimeToVisit(request.getBestTimeToVisit())
                .recommendedDuration(request.getRecommendedDuration())
                .difficultyLevel(request.getDifficultyLevel())
                .accessibilityInfo(request.getAccessibilityInfo())
                .history(request.getHistory())
                .culture(request.getCulture())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .isFeatured(request.getIsFeatured())
                .build();

        Destination savedDestination = destinationRepository.save(destination);
        log.info("Created destination: {} with ID: {}", savedDestination.getName(), savedDestination.getId());
        
        return destinationMapper.toDto(savedDestination);
    }

    @Transactional
    public DestinationDto updateDestination(UUID id, UpdateDestinationRequest request) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));

        if (request.getName() != null) destination.setName(request.getName());
        if (request.getCategory() != null) destination.setCategory(request.getCategory());
        if (request.getDescription() != null) destination.setDescription(request.getDescription());
        if (request.getShortDescription() != null) destination.setShortDescription(request.getShortDescription());
        if (request.getMainImageUrl() != null) destination.setMainImageUrl(request.getMainImageUrl());
        if (request.getBestTimeToVisit() != null) destination.setBestTimeToVisit(request.getBestTimeToVisit());
        if (request.getRecommendedDuration() != null) destination.setRecommendedDuration(request.getRecommendedDuration());
        if (request.getDifficultyLevel() != null) destination.setDifficultyLevel(request.getDifficultyLevel());
        if (request.getAccessibilityInfo() != null) destination.setAccessibilityInfo(request.getAccessibilityInfo());
        if (request.getHistory() != null) destination.setHistory(request.getHistory());
        if (request.getCulture() != null) destination.setCulture(request.getCulture());
        if (request.getLatitude() != null) destination.setLatitude(request.getLatitude());
        if (request.getLongitude() != null) destination.setLongitude(request.getLongitude());
        if (request.getIsFeatured() != null) destination.setIsFeatured(request.getIsFeatured());
        if (request.getIsActive() != null) destination.setIsActive(request.getIsActive());

        Destination updatedDestination = destinationRepository.save(destination);
        log.info("Updated destination: {}", updatedDestination.getName());
        
        return destinationMapper.toDto(updatedDestination);
    }

    @Transactional
    public void deleteDestination(UUID id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
        
        destinationRepository.delete(destination);
        log.info("Deleted destination: {}", destination.getName());
    }

    @Transactional
    public DestinationDto toggleFeatured(UUID id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
        
        destination.setIsFeatured(!destination.getIsFeatured());
        Destination updatedDestination = destinationRepository.save(destination);
        
        log.info("Toggled featured status for destination: {} to {}", 
                updatedDestination.getName(), updatedDestination.getIsFeatured());
        
        return destinationMapper.toDto(updatedDestination);
    }

    @Transactional
    public DestinationDto toggleActive(UUID id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
        
        destination.setIsActive(!destination.getIsActive());
        Destination updatedDestination = destinationRepository.save(destination);
        
        log.info("Toggled active status for destination: {} to {}", 
                updatedDestination.getName(), updatedDestination.getIsActive());
        
        return destinationMapper.toDto(updatedDestination);
    }
}