package com.travelpro.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CountryApiResponse {
    private Name name;
    private String cca3;
    private List<String> currencies;
    private List<String> languages;
    private List<String> timezones;
    
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Name {
        private String common;
        private String official;
    }
}