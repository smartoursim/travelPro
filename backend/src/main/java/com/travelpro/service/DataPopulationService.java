package com.travelpro.service;

import com.travelpro.entity.*;
import com.travelpro.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataPopulationService {

    private final CountryRepository countryRepository;
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;
    private final DestinationRepository destinationRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.external.google.places.key:}")
    private String googlePlacesKey;

    @Value("${app.external.unsplash.key:}")
    private String unsplashKey;

    @Transactional
    public void populateIndianDestinations() {
        log.info("Starting Indian destinations population...");
        
        // Create India if not exists
        Country india = getOrCreateCountry("India", "IND");
        
        // Popular Indian destinations data
        List<DestinationData> destinations = Arrays.asList(
            new DestinationData("Taj Mahal", "taj-mahal", "Agra", "Uttar Pradesh", "Historical", 
                "An ivory-white marble mausoleum and UNESCO World Heritage Site", 
                "https://images.unsplash.com/photo-1564507592333-c60657eea523", 4.8f),
            
            new DestinationData("Kerala Backwaters", "kerala-backwaters", "Alleppey", "Kerala", "Nature",
                "Network of brackish lagoons and lakes famous for houseboat cruises",
                "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944", 4.6f),
            
            new DestinationData("Goa Beaches", "goa-beaches", "Panaji", "Goa", "Beach",
                "Golden sandy beaches with Portuguese colonial architecture",
                "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2", 4.4f),
            
            new DestinationData("Rajasthan Palaces", "rajasthan-palaces", "Jaipur", "Rajasthan", "Historical",
                "Royal palaces showcasing grandeur of Rajput architecture",
                "https://images.unsplash.com/photo-1599661046827-dacde6976549", 4.7f),
            
            new DestinationData("Himachal Mountains", "himachal-mountains", "Shimla", "Himachal Pradesh", "Mountain",
                "Scenic hill stations with snow-capped peaks and adventure sports",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", 4.5f),
            
            new DestinationData("Golden Temple", "golden-temple", "Amritsar", "Punjab", "Spiritual",
                "Holiest Gurdwara of Sikhism with stunning golden architecture",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96", 4.9f),
            
            new DestinationData("Ladakh", "ladakh", "Leh", "Ladakh", "Adventure",
                "High-altitude desert with Buddhist monasteries and stunning landscapes",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", 4.8f),
            
            new DestinationData("Hampi", "hampi", "Hampi", "Karnataka", "Historical",
                "UNESCO World Heritage Site with ancient Vijayanagara Empire ruins",
                "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", 4.6f)
        );

        for (DestinationData destData : destinations) {
            createDestination(destData, india);
        }
        
        log.info("Completed Indian destinations population");
    }

    private Country getOrCreateCountry(String name, String code) {
        return countryRepository.findByCode(code)
                .orElseGet(() -> countryRepository.save(
                    Country.builder()
                        .name(name)
                        .code(code)
                        .currency("INR")
                        .language("Hindi")
                        .timezone("Asia/Kolkata")
                        .build()
                ));
    }

    private void createDestination(DestinationData data, Country country) {
        // Create state if not exists
        State state = stateRepository.findByCountryIdAndName(country.getId(), data.stateName)
                .orElseGet(() -> stateRepository.save(
                    State.builder()
                        .country(country)
                        .name(data.stateName)
                        .build()
                ));

        // Create city if not exists
        City city = cityRepository.findByStateIdAndName(state.getId(), data.cityName)
                .orElseGet(() -> cityRepository.save(
                    City.builder()
                        .state(state)
                        .name(data.cityName)
                        .build()
                ));

        // Create destination if not exists
        if (!destinationRepository.existsBySlug(data.slug)) {
            Destination destination = Destination.builder()
                    .name(data.name)
                    .slug(data.slug)
                    .city(city)
                    .category(data.category)
                    .description(data.description)
                    .shortDescription(data.description.substring(0, Math.min(data.description.length(), 100)))
                    .mainImageUrl(data.imageUrl)
                    .rating(BigDecimal.valueOf(data.rating))
                    .reviewCount(generateRandomReviewCount())
                    .bestTimeToVisit(getBestTimeForCategory(data.category))
                    .recommendedDuration(getDurationForCategory(data.category))
                    .difficultyLevel("Easy")
                    .isFeatured(data.rating > 4.5)
                    .isActive(true)
                    .build();

            destinationRepository.save(destination);
            log.info("Created destination: {}", data.name);
        }
    }

    private int generateRandomReviewCount() {
        return (int) (Math.random() * 1000) + 100;
    }

    private String getBestTimeForCategory(String category) {
        return switch (category) {
            case "Mountain" -> "March to June, September to November";
            case "Beach" -> "November to February";
            case "Historical", "Spiritual" -> "October to March";
            case "Nature" -> "November to February";
            case "Adventure" -> "April to June, September to November";
            default -> "October to March";
        };
    }

    private String getDurationForCategory(String category) {
        return switch (category) {
            case "Historical", "Spiritual" -> "1-2 days";
            case "Beach", "Nature" -> "3-5 days";
            case "Mountain", "Adventure" -> "4-7 days";
            default -> "2-3 days";
        };
    }

    // Inner class for destination data
    private static class DestinationData {
        String name, slug, cityName, stateName, category, description, imageUrl;
        float rating;

        DestinationData(String name, String slug, String cityName, String stateName, 
                       String category, String description, String imageUrl, float rating) {
            this.name = name;
            this.slug = slug;
            this.cityName = cityName;
            this.stateName = stateName;
            this.category = category;
            this.description = description;
            this.imageUrl = imageUrl;
            this.rating = rating;
        }
    }
}