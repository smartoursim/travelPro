package com.travelpro.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {

    private final SecretKey jwtSecret;
    private final int jwtExpirationInMs;

    public JwtTokenProvider(@Value("${app.jwt.secret}") String jwtSecret,
                           @Value("${app.jwt.expiration}") int jwtExpirationInMs) {
        this.jwtSecret = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.jwtExpirationInMs = jwtExpirationInMs;
    }

    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .setIssuer("http://localhost:8080/api")
                .claim("roles", userPrincipal.getAuthorities().stream()
                        .map(authority -> authority.getAuthority())
                        .toArray(String[]::new))
                .signWith(jwtSecret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(authToken);
            return true;
        } catch (SecurityException ex) {
            log.debug("Invalid JWT signature: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.debug("Invalid JWT token: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            log.debug("Expired JWT token: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.debug("Unsupported JWT token: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.debug("JWT claims string is empty: {}", ex.getMessage());
        } catch (Exception ex) {
            log.debug("JWT token validation failed: {}", ex.getMessage());
        }
        return false;
    }
}