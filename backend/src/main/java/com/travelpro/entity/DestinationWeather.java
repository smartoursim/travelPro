package com.travelpro.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "destination_weather", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"destination_id", "month"})
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class DestinationWeather {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @Column(nullable = false)
    private Integer month;

    @Column(name = "min_temperature")
    private Integer minTemperature;

    @Column(name = "max_temperature")
    private Integer maxTemperature;

    private Integer rainfall;

    private Integer humidity;

    @Column(name = "weather_description", columnDefinition = "TEXT")
    private String weatherDescription;

    @Column(name = "clothing_recommendations", columnDefinition = "TEXT[]")
    private String[] clothingRecommendations;

    @Column(name = "activities_recommended", columnDefinition = "TEXT[]")
    private String[] activitiesRecommended;

    @Column(name = "travel_tips", columnDefinition = "TEXT[]")
    private String[] travelTips;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}