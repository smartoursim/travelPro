package com.travelpro.service;

import com.travelpro.dto.AuthRequest;
import com.travelpro.dto.AuthResponse;
import com.travelpro.dto.RegisterRequest;
import com.travelpro.dto.UserDto;
import com.travelpro.entity.User;
import com.travelpro.exception.AuthenticationException;
import com.travelpro.exception.ResourceNotFoundException;
import com.travelpro.mapper.UserMapper;
import com.travelpro.repository.UserRepository;
import com.travelpro.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthenticationException("Email already exists");
        }

        User user = userMapper.toEntity(request);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPreferences("{}"); // Set default JSON after entity creation
        
        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(authentication);
        UserDto userDto = userMapper.toDto(savedUser);

        return new AuthResponse(token, userDto);
    }

    @Transactional
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(authentication);
        UserDto userDto = userMapper.toDto(user);

        log.info("User logged in successfully: {}", user.getEmail());
        return new AuthResponse(token, userDto);
    }

    public UserDto getCurrentUser(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return userMapper.toDto(user);
    }
}