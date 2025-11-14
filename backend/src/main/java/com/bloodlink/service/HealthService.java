package com.bloodlink.service;

import com.bloodlink.dto.HealthStatusDTO;
import com.bloodlink.repo.MainRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

    private static final Logger logger = LoggerFactory.getLogger(HealthService.class);
    private final MainRepository repository;

    @Autowired
    public HealthService(MainRepository repository) {
        this.repository = repository;
    }

    public HealthStatusDTO checkHealth() {
        try {
            long totalDonors = repository.getTotalDonors();
            logger.info("Health check successful. Donors: {}", totalDonors);
            return HealthStatusDTO.up(totalDonors);
        } catch (Exception e) {
            logger.error("Health check failed due to a database connection issue.", e);
            return HealthStatusDTO.down(e.getMessage());
        }
    }
}