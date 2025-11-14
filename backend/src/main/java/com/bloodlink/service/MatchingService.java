package com.bloodlink.service;

import com.bloodlink.dto.BloodRequest;
import com.bloodlink.dto.Donor;
import com.bloodlink.dto.DonorMatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private static final Logger logger = LoggerFactory.getLogger(MatchingService.class);

    private final DonorService donorService; // Inject DonorService, not the repository

    @Autowired
    public MatchingService(DonorService donorService) {
        this.donorService = donorService;
    }

    public List<DonorMatch> findBestDonors(BloodRequest request) {
        logger.info("Searching donors for blood group: {}, location: {}", request.getBloodGroup(), request.getLocation());

        // Use the search method from DonorService
        List<Donor> donors = donorService.searchCompatibleDonors(request.getBloodGroup(), request.getLocation());
        logger.info("Found {} potential donors for matching", donors.size());

        List<DonorMatch> matches = donors.stream()
            .map(donor -> {
                double score = calculateAvailabilityScore(donor);
                // Create a new DonorMatch object; assumes constructor (Donor, double, int) exists
                return new DonorMatch(donor, score, 1); 
            })
            .sorted((m1, m2) -> Double.compare(m2.getAvailabilityScore(), m1.getAvailabilityScore())) // Sort by score descending
            .collect(Collectors.toList());

        logger.info("Returning {} sorted matches.", matches.size());
        return matches;
    }

    private double calculateAvailabilityScore(Donor donor) {
        // This scoring logic remains the same
        if (donor.getLastDonationDate() == null) {
            return 1.0; // Assume fully available if never donated
        }
        Date sqlDate = donor.getLastDonationDate();
        LocalDate lastDonation = sqlDate.toLocalDate();
        long daysSinceDonation = ChronoUnit.DAYS.between(lastDonation, LocalDate.now());

        if (daysSinceDonation >= 90) return 1.0; // High availability
        if (daysSinceDonation >= 60) return 0.75; // Medium availability
        if (daysSinceDonation >= 30) return 0.5; // Low availability
        return 0.1; // Very low availability
    }
}