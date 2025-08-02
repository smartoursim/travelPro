package com.travelpro.controller;

import com.travelpro.service.DataPopulationService;
import com.travelpro.service.DataSeedingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/populate")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin - Data Population", description = "Populate database with sample data")
public class DataPopulationController {

    private final DataPopulationService dataPopulationService;
    private final DataSeedingService dataSeedingService;

    @PostMapping("/countries")
    @Operation(summary = "Populate countries", description = "Populate database with countries from REST Countries API")
    public ResponseEntity<String> populateCountries() {
        log.info("POST /admin/populate/countries - Starting countries population");
        
        try {
            dataSeedingService.triggerCountriesSeeding();
            return ResponseEntity.ok("Countries populated successfully");
        } catch (Exception e) {
            log.error("Error populating countries: ", e);
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/destinations")
    @Operation(summary = "Populate destinations", description = "Populate database with Indian destinations")
    public ResponseEntity<String> populateDestinations() {
        log.info("POST /admin/populate/destinations - Starting destinations population");
        
        try {
            dataPopulationService.populateIndianDestinations();
            return ResponseEntity.ok("Indian destinations populated successfully");
        } catch (Exception e) {
            log.error("Error populating destinations: ", e);
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/all")
    @Operation(summary = "Populate all data", description = "Populate countries and destinations")
    public ResponseEntity<String> populateAll() {
        log.info("POST /admin/populate/all - Starting full data population");
        
        try {
            // First populate countries
            dataSeedingService.triggerCountriesSeeding();
            Thread.sleep(2000); // Wait for countries to be created
            
            // Then populate destinations
            dataPopulationService.populateIndianDestinations();
            
            return ResponseEntity.ok("All data populated successfully");
        } catch (Exception e) {
            log.error("Error populating all data: ", e);
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}