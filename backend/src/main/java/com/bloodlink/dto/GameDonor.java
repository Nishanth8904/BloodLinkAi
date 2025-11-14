// backend/src/main/java/com/bloodlink/dto/GameDonor.java
package com.bloodlink.dto;

public class GameDonor {
    private String name;
    private String bloodGroup;
    private int mlDonated;
    private String email; // --- ADD THIS FIELD ---

    // Constructors, Getters, and Setters
    public GameDonor() {}

    public GameDonor(String name, String bloodGroup, int mlDonated, String email) {
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.mlDonated = mlDonated;
        this.email = email;
    }

    // --- GETTERS AND SETTERS FOR ALL FIELDS ---
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public int getMlDonated() { return mlDonated; }
    public void setMlDonated(int mlDonated) { this.mlDonated = mlDonated; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
