package com.bloodlink.dto;

public class DonorMatch {
    private Donor donor;
    private double availabilityScore;
    private int matchRank;

    // No-arg constructor for Jackson
    public DonorMatch() {}

    public DonorMatch(Donor donor, double availabilityScore, int matchRank) {
        this.donor = donor;
        this.availabilityScore = availabilityScore;
        this.matchRank = matchRank;
    }

    public Donor getDonor() {
        return donor;
    }
    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public double getAvailabilityScore() {
        return availabilityScore;
    }
    public void setAvailabilityScore(double availabilityScore) {
        this.availabilityScore = availabilityScore;
    }

    public int getMatchRank() {
        return matchRank;
    }
    public void setMatchRank(int matchRank) {
        this.matchRank = matchRank;
    }

    @Override
    public String toString() {
        return "DonorMatch{" +
            "donor=" + donor +
            ", availabilityScore=" + availabilityScore +
            ", matchRank=" + matchRank +
            '}';
    }
}
