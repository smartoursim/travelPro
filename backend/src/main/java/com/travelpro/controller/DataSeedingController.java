package com.travelpro.controller;

import com.travelpro.service.DataSeedingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/data-seeding")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin - Data Seeding", description = "Manual data seeding triggers")
@PreAuthorize("hasRole('ADMIN')")
public class DataSeedingController {

    private final DataSeedingService dataSeedingService;

    @PostMapping("/countries")
    @Operation(summary = "Seed countries data", description = "Manually trigger countries data seeding from REST Countries API")
    public ResponseEntity<String> seedCountries() {
        log.info("POST /admin/data-seeding/countries - Manual countries seeding triggered");
        
        try {
            dataSeedingService.triggerCountriesSeeding();
            return ResponseEntity.ok("Countries data seeding completed successfully");
        } catch (Exception e) {
            log.error("Error during manual countries seeding: ", e);
            return ResponseEntity.internalServerError().body("Error during countries seeding: " + e.getMessage());
        }
    }
}