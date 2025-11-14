package com.bloodlink.service;

import com.bloodlink.dto.Donor;
import com.bloodlink.repo.MainRepository;
import com.bloodlink.util.BloodCompatibilityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonorService {

    private final MainRepository donorRepository;

    @Autowired
    public DonorService(MainRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAllDonors();
    }

    public Donor getDonorById(String id) {
        return donorRepository.findDonorById(id);
    }

    public List<Donor> searchCompatibleDonors(String bloodGroup, String location) {
        if (bloodGroup == null || bloodGroup.isBlank()) {
            return Collections.emptyList();
        }

        List<String> compatibleGroups = BloodCompatibilityUtil.getCompatibleBloodGroups(bloodGroup);
        
        return donorRepository.findAllDonors().stream()
                .filter(donor -> compatibleGroups.contains(donor.getBloodGroup()))
                .filter(donor -> location == null || location.isBlank() || donor.getLocation().equalsIgnoreCase(location))
                .collect(Collectors.toList());
    }

    public Donor createDonor(Donor donor) {
        int result = donorRepository.saveDonor(donor);
        return result > 0 ? donor : null;
    }

    public boolean updateDonor(String id, Donor donor) {
        return donorRepository.updateDonor(id, donor) > 0;
    }

    public boolean deleteDonor(String id) {
        return donorRepository.deleteDonorById(id) > 0;
    }

    public boolean updateDonorAvailability(String id, boolean available) {
        Donor donor = donorRepository.findDonorById(id);
        if (donor == null) {
            return false; // Donor not found
        }
        donor.setAvailable(available);
        return donorRepository.updateDonor(id, donor) > 0;
    }
}