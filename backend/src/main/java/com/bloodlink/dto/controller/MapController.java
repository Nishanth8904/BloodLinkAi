package com.bloodlink.dto.controller;

import com.bloodlink.dto.DonorLocationCountDTO;
import com.bloodlink.repo.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/map")
public class MapController {

    @Autowired
    private MainRepository repository;

    @GetMapping("/donor-counts")
    public ResponseEntity<List<DonorLocationCountDTO>> getDonorLocationCounts() {
        List<DonorLocationCountDTO> counts = repository.getDonorCountsByLocation();
        return ResponseEntity.ok(counts);
    }
}