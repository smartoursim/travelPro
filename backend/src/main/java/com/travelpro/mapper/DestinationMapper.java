package com.travelpro.mapper;

import com.travelpro.dto.*;
import com.travelpro.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DestinationMapper {

    DestinationDto toDto(Destination destination);
    
    List<DestinationDto> toDtoList(List<Destination> destinations);

    AttractionDto toDto(Attraction attraction);
    
    List<AttractionDto> toAttractionDtoList(List<Attraction> attractions);

    DestinationBudgetDto toDto(DestinationBudget budget);
    
    List<DestinationBudgetDto> toBudgetDtoList(List<DestinationBudget> budgets);

    DestinationWeatherDto toDto(DestinationWeather weather);
    
    List<DestinationWeatherDto> toWeatherDtoList(List<DestinationWeather> weather);

    DestinationImageDto toDto(DestinationImage image);
    
    List<DestinationImageDto> toImageDtoList(List<DestinationImage> images);

    CityDto toDto(City city);

    StateDto toDto(State state);

    CountryDto toDto(Country country);
}