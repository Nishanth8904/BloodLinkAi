package com.bloodlink.dto;

import java.time.Instant;

public class HealthStatusDTO {

    private String status;
    private long totalDonors;
    private Instant timestamp;
    private String error;

    public HealthStatusDTO(String status, long totalDonors, String error) {
        this.status = status;
        this.totalDonors = totalDonors;
        this.timestamp = Instant.now();
        this.error = error;
    }

    public static HealthStatusDTO up(long totalDonors) {
        return new HealthStatusDTO("UP", totalDonors, null);
    }

    public static HealthStatusDTO down(String errorMessage) {
        return new HealthStatusDTO("DOWN", 0, errorMessage);
    }

    // Standard Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public long getTotalDonors() { return totalDonors; }
    public void setTotalDonors(long totalDonors) { this.totalDonors = totalDonors; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}