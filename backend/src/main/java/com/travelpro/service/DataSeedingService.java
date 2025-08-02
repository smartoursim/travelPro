package com.travelpro.service;

import com.travelpro.dto.external.CountryApiResponse;
import com.travelpro.entity.Country;
import com.travelpro.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataSeedingService {

    private final CountryRepository countryRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.external.restcountries.url:https://restcountries.com/v3.1}")
    private String countriesApiUrl;

    @Scheduled(cron = "0 0 2 * * SUN") // Weekly on Sunday at 2 AM
    public void seedCountriesData() {
        log.info("Starting countries data seeding...");
        
        try {
            CountryApiResponse[] countries = restTemplate.getForObject(
                countriesApiUrl + "/all?fields=name,cca3,currencies,languages,timezones", 
                CountryApiResponse[].class
            );

            if (countries != null) {
                for (CountryApiResponse countryApi : countries) {
                    saveOrUpdateCountry(countryApi);
                }
                log.info("Successfully seeded {} countries", countries.length);
            }
        } catch (Exception e) {
            log.error("Error seeding countries data: ", e);
        }
    }

    private void saveOrUpdateCountry(CountryApiResponse countryApi) {
        Country existingCountry = countryRepository.findByCode(countryApi.getCca3()).orElse(null);
        
        if (existingCountry == null) {
            Country country = Country.builder()
                    .name(countryApi.getName().getCommon())
                    .code(countryApi.getCca3())
                    .currency(countryApi.getCurrencies() != null && !countryApi.getCurrencies().isEmpty() 
                            ? countryApi.getCurrencies().get(0) : null)
                    .language(countryApi.getLanguages() != null && !countryApi.getLanguages().isEmpty() 
                            ? countryApi.getLanguages().get(0) : null)
                    .timezone(countryApi.getTimezones() != null && !countryApi.getTimezones().isEmpty() 
                            ? countryApi.getTimezones().get(0) : null)
                    .build();
            
            countryRepository.save(country);
            log.debug("Saved new country: {}", country.getName());
        }
    }

    // Manual trigger for testing
    public void triggerCountriesSeeding() {
        seedCountriesData();
    }
}