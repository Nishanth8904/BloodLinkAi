package com.bloodlink.dto.controller; // <-- CORRECT

import com.bloodlink.dto.AIPredictRequest;
import com.bloodlink.dto.AIPredictResponse;
import com.bloodlink.service.AIClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class AIController {

    private static final Logger logger = LoggerFactory.getLogger(AIController.class);

    private final AIClient ai;

    public AIController(AIClient ai) { 
        this.ai = ai; 
    }

    @PostMapping("/predict")
    public ResponseEntity<AIPredictResponse> predict(@Valid @RequestBody AIPredictRequest req) {
        logger.info("Received AI prediction request: {}", req);

        try {
            AIPredictResponse response = ai.predict(req);
            logger.info("AI prediction successful: {}", response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error processing AI prediction: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        boolean isHealthy = ai.isHealthy();
        if (isHealthy) {
            return ResponseEntity.ok("AI service is healthy");
        } else {
            return ResponseEntity.status(503).body("AI service is unavailable");
        }
    }
}