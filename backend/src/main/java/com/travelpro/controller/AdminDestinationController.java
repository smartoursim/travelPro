package com.travelpro.controller;

import com.travelpro.dto.CreateDestinationRequest;
import com.travelpro.dto.DestinationDto;
import com.travelpro.dto.UpdateDestinationRequest;
import com.travelpro.service.AdminDestinationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin/destinations")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin - Destinations", description = "Admin destination management APIs")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDestinationController {

    private final AdminDestinationService adminDestinationService;

    @PostMapping
    @Operation(summary = "Create destination", description = "Create a new destination (Admin only)")
    public ResponseEntity<DestinationDto> createDestination(@Valid @RequestBody CreateDestinationRequest request) {
        log.info("POST /admin/destinations - Creating destination: {}", request.getName());
        DestinationDto destination = adminDestinationService.createDestination(request);
        return ResponseEntity.ok(destination);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update destination", description = "Update existing destination (Admin only)")
    public ResponseEntity<DestinationDto> updateDestination(
            @PathVariable UUID id, 
            @Valid @RequestBody UpdateDestinationRequest request) {
        log.info("PUT /admin/destinations/{} - Updating destination", id);
        DestinationDto destination = adminDestinationService.updateDestination(id, request);
        return ResponseEntity.ok(destination);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete destination", description = "Delete destination (Admin only)")
    public ResponseEntity<Void> deleteDestination(@PathVariable UUID id) {
        log.info("DELETE /admin/destinations/{} - Deleting destination", id);
        adminDestinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/featured")
    @Operation(summary = "Toggle featured status", description = "Toggle destination featured status (Admin only)")
    public ResponseEntity<DestinationDto> toggleFeatured(@PathVariable UUID id) {
        log.info("PUT /admin/destinations/{}/featured - Toggling featured status", id);
        DestinationDto destination = adminDestinationService.toggleFeatured(id);
        return ResponseEntity.ok(destination);
    }

    @PutMapping("/{id}/active")
    @Operation(summary = "Toggle active status", description = "Toggle destination active status (Admin only)")
    public ResponseEntity<DestinationDto> toggleActive(@PathVariable UUID id) {
        log.info("PUT /admin/destinations/{}/active - Toggling active status", id);
        DestinationDto destination = adminDestinationService.toggleActive(id);
        return ResponseEntity.ok(destination);
    }
}