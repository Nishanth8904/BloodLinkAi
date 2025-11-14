package com.bloodlink.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

public class AIPredictRequest {
    @NotNull
    private Integer donorId;

    @NotEmpty
    private String bloodGroup;

    private String location;

    @Min(1)
    private Integer units = 1;

    public AIPredictRequest() {}

    public AIPredictRequest(Integer donorId, String bloodGroup, String location, Integer units) {
        this.donorId = donorId;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.units = units;
    }

    // Getters and Setters
    public Integer getDonorId() { return donorId; }
    public void setDonorId(Integer donorId) { this.donorId = donorId; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }

    @Override
    public String toString() {
        return "AIPredictRequest{" +
                "donorId=" + donorId +
                ", bloodGroup='" + bloodGroup + "'" +
                ", location='" + location + "'" +
                ", units=" + units +
                '}';
    }
}