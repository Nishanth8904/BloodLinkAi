// backend/src/main/java/com/bloodlink/controller/GameController.java
package com.bloodlink.dto.controller;

import com.bloodlink.dto.GameDonor;
import com.bloodlink.dto.GameState;
import com.bloodlink.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:8080") // Adjust port if needed
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/state")
    public GameState getGameState() {
        return gameService.getGameState();
    }

    @PostMapping("/donate")
    public GameState addDonation(@RequestBody GameDonor donor) {
        return gameService.addDonation(donor);
    }

    @PostMapping("/reset")
    public GameState resetGame() {
        return gameService.resetGame();
    }
}
