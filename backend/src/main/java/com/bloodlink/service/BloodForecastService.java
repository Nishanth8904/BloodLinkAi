package com.bloodlink.service;

import com.bloodlink.dto.DonorLocationCountDTO;
import com.bloodlink.repo.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodForecastService {

    private final MainRepository mainRepository;

    // Use @Autowired for constructor injection
    @Autowired
    public BloodForecastService(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    /**
     * Retrieves the count of donors for each location.
     * This is used for the Blood Forecast Map feature.
     * @return A list of donor location counts.
     */
    public List<DonorLocationCountDTO> getDonorLocationCounts() {
        // Corrected the method call to match the refactored repository
        return mainRepository.getDonorCountsByLocation();
    }
}