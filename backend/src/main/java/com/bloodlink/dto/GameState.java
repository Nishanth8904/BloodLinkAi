// backend/src/main/java/com/bloodlink/dto/GameState.java
package com.bloodlink.dto;

import java.util.List;
import java.util.ArrayList;

public class GameState {
    private int totalBloodMl;
    private List<GameDonor> donors;

    // Constructors, Getters, and Setters
    public GameState() {
        this.totalBloodMl = 0;
        this.donors = new ArrayList<>();
    }

    public int getTotalBloodMl() {
        return totalBloodMl;
    }

    public void setTotalBloodMl(int totalBloodMl) {
        this.totalBloodMl = totalBloodMl;
    }

    public List<GameDonor> getDonors() {
        return donors;
    }

    public void setDonors(List<GameDonor> donors) {
        this.donors = donors;
    }
}
