package com.bloodlink.dto.controller;

import com.bloodlink.dto.BloodRequest;
import com.bloodlink.dto.DonorMatch;
import com.bloodlink.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MatchingController {

    private static final Logger logger = LoggerFactory.getLogger(MatchingController.class);

    @Autowired
    private MatchingService matchingService;

    @PostMapping("/match")
    public ResponseEntity<List<DonorMatch>> getMatches(@RequestBody BloodRequest request) {
        logger.info("Received match request: bloodGroup={}, location={}, units={}",
            request.getBloodGroup(), request.getLocation(), request.getUnits());

        List<DonorMatch> matches = matchingService.findBestDonors(request);

        logger.info("Found {} donor matches", matches.size());
        return ResponseEntity.ok(matches);
    }
}
