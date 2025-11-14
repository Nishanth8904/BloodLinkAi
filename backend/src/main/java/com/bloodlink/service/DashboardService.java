package com.bloodlink.service;

import com.bloodlink.dto.DashboardStatsDTO;
import com.bloodlink.repo.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private MainRepository repository;

    public DashboardStatsDTO getDashboardStats() {
        int donors = repository.getTotalDonors();
       
        
        return new DashboardStatsDTO(donors);
    }
}