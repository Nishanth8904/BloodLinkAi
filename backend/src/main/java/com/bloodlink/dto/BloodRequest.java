package com.bloodlink.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "blood_requests")
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @NotEmpty
    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Min(1)
    @Column(name = "units", nullable = false)
    private Integer units;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "status", nullable = false)
    private String status = "PENDING";

    @Column(name = "priority_score", nullable = true)
    private Double priorityScore;

    public BloodRequest() {}

    public BloodRequest(Integer patientId, String bloodGroup, Integer units, String location) {
        this.patientId = patientId;
        this.bloodGroup = bloodGroup;
        this.units = units;
        this.location = location;
        this.status = "PENDING";
    }

    // Getters and setters

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getPatientId() { return patientId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getPriorityScore() { return priorityScore; }
    public void setPriorityScore(Double priorityScore) { this.priorityScore = priorityScore; }

    // Calculate and set priority score based on status and units
    public void calculateAndSetPriorityScore() {
        double priority = 0.0;
        if ("CRITICAL".equalsIgnoreCase(this.status)) {
            priority = 1.0;
        } else if ("HIGH".equalsIgnoreCase(this.status)) {
            priority = 0.75;
        } else if ("MEDIUM".equalsIgnoreCase(this.status) || "PENDING".equalsIgnoreCase(this.status)) {
            priority = 0.5;
        } else if ("LOW".equalsIgnoreCase(this.status)) {
            priority = 0.25;
        } else {
            priority = 0.3; // default fallback priority for unknown statuses
        }

        if (this.units != null) {
            if (this.units > 5) {
                priority += 0.2;
            } else if (this.units > 2) {
                priority += 0.1;
            }
        }

        if (priority > 1.0) {
            priority = 1.0;
        }

        System.out.println("Calculated priority for request with status '" + this.status + "' and units " + this.units + ": " + priority);

        setPriorityScore(priority);
    }

    @Override
    public String toString() {
        return "BloodRequest{" +
                "id=" + id +
                ", patientId=" + patientId +
                ", bloodGroup='" + bloodGroup + '\'' +
                ", units=" + units +
                ", location='" + location + '\'' +
                ", status='" + status + '\'' +
                ", priorityScore=" + priorityScore +
                '}';
    }
}
