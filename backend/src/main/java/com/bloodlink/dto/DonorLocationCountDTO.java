package com.bloodlink.dto;

public class DonorLocationCountDTO {
    private String location;
    private long count;

    // This is the constructor your code is looking for
    public DonorLocationCountDTO(String location, long count) {
        this.location = location;
        this.count = count;
    }

    // Getters and Setters
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}