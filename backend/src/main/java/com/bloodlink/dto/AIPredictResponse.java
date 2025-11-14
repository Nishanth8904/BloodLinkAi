package com.bloodlink.dto;

public class AIPredictResponse {
    private Integer donorId;
    private Double availabilityScore;

    public AIPredictResponse() {}

    public AIPredictResponse(Integer donorId, Double availabilityScore) {
        this.donorId = donorId;
        this.availabilityScore = availabilityScore;
    }

    // Getters and Setters
    public Integer getDonorId() { return donorId; }
    public void setDonorId(Integer donorId) { this.donorId = donorId; }

    public Double getAvailabilityScore() { return availabilityScore; }
    public void setAvailabilityScore(Double availabilityScore) { this.availabilityScore = availabilityScore; }

    @Override
    public String toString() {
        return "AIPredictResponse{" +
                "donorId=" + donorId +
                ", availabilityScore=" + availabilityScore +
                '}';
    }
}