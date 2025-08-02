package com.travelpro.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@Slf4j
public class TestController {

    @GetMapping("/protected")
    public ResponseEntity<String> protectedEndpoint(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new org.springframework.security.core.AuthenticationException("Authentication required") {};
        }
        
        log.info("Protected endpoint accessed by: {}", authentication.getName());
        return ResponseEntity.ok("Hello " + authentication.getName() + "! This is a protected endpoint.");
    }

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        log.info("Public endpoint accessed");
        return ResponseEntity.ok("This is a public endpoint - no authentication required.");
    }
}