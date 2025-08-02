package com.travelpro.controller;

import com.travelpro.dto.AuthRequest;
import com.travelpro.dto.AuthResponse;
import com.travelpro.dto.RegisterRequest;
import com.travelpro.dto.UserDto;
import com.travelpro.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "User authentication APIs")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Create a new user account")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("POST /auth/register - email: {}", request.getEmail());
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user and return JWT token")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        log.info("POST /auth/login - email: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Get current authenticated user profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new org.springframework.security.core.AuthenticationException("Authentication required") {};
        }
        
        log.info("GET /auth/profile - user: {}", authentication.getName());
        UserDto user = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(user);
    }
}