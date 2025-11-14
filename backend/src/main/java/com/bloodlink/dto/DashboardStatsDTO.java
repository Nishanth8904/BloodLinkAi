package com.bloodlink.dto;

public class DashboardStatsDTO {
    private int totalDonors;

   

    public DashboardStatsDTO(int totalDonors) {
        this.totalDonors = totalDonors;
        
        
    }

    // Getters and Setters
    public int getTotalDonors() { return totalDonors; }
    public void setTotalDonors(int totalDonors) { this.totalDonors = totalDonors; }
}
  
 
   