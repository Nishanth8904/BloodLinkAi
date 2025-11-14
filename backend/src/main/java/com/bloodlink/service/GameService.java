// backend/src/main/java/com/bloodlink/service/GameService.java
package com.bloodlink.service;

import com.bloodlink.dto.GameDonor;
import com.bloodlink.dto.GameState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private GameState gameState = new GameState();
    private boolean completionEmailSent = false;
    private static final int GOAL_ML = 8000;

    @Autowired
    private EmailService emailService;

    public GameState getGameState() {
        return this.gameState;
    }

    public GameState addDonation(GameDonor donor) {
        this.gameState.setTotalBloodMl(this.gameState.getTotalBloodMl() + donor.getMlDonated());
        this.gameState.getDonors().add(0, donor);

        if (this.gameState.getTotalBloodMl() >= GOAL_ML && !completionEmailSent) {
            sendCompletionEmails();
            completionEmailSent = true;
        }
        return this.gameState;
    }

    /**
     * Sends completion emails to all donors who provided an email address.
     * This method now includes a null check to prevent errors.
     */
    private void sendCompletionEmails() {
        for (GameDonor donor : this.gameState.getDonors()) {
            // --- THIS IS THE FIX ---
            // This 'if' statement checks that the email is not null before using it.
            if (donor.getEmail() != null && !donor.getEmail().isEmpty()) {
                emailService.sendGameCompletionEmail(donor.getEmail(), donor.getName());
            }
        }
    }

    public GameState resetGame() {
        this.gameState = new GameState();
        this.completionEmailSent = false;
        return this.gameState;
    }
}
