package com.bloodlink.dto.controller; // It's conventional to put controllers in a 'controller' package

import com.bloodlink.dto.Donor;
import com.bloodlink.service.DonorService; // Import the service
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/donors") // Base path for all donor-related endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class DonorController {

    private static final Logger logger = LoggerFactory.getLogger(DonorController.class);

    private final DonorService donorService; // Inject the Service, NOT the Repository

    @Autowired
    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        logger.info("Request to fetch all donors");
        List<Donor> donors = donorService.getAllDonors();
        return ResponseEntity.ok(donors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable String id) {
        logger.info("Request to fetch donor with id: {}", id);
        Donor donor = donorService.getDonorById(id);
        return donor != null ? ResponseEntity.ok(donor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Donor>> searchDonors(
            @RequestParam String bloodGroup,
            @RequestParam(required = false) String location) {
        logger.info("Request to search donors with bloodGroup: {} and location: {}", bloodGroup, location);
        List<Donor> donors = donorService.searchCompatibleDonors(bloodGroup, location);
        return ResponseEntity.ok(donors);
    }

    @PostMapping
    public ResponseEntity<Donor> createDonor(@Valid @RequestBody Donor donor) {
        logger.info("Request to add new donor: {}", donor.getName());
        Donor createdDonor = donorService.createDonor(donor);
        return createdDonor != null ? ResponseEntity.status(201).body(createdDonor) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateDonor(@PathVariable String id, @Valid @RequestBody Donor donor) {
        logger.info("Request to update donor with id: {}", id);
        boolean updated = donorService.updateDonor(id, donor);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(@PathVariable String id) {
        logger.info("Request to delete donor with id: {}", id);
        boolean deleted = donorService.deleteDonor(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/availability")
    public ResponseEntity<Void> updateAvailability(@PathVariable String id, @RequestParam boolean available) {
        logger.info("Request to update availability for donor {} to {}", id, available);
        boolean updated = donorService.updateDonorAvailability(id, available);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}