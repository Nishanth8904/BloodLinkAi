package com.bloodlink.dto.controller; // It is better to move this to the main 'controller' package

import com.bloodlink.dto.HealthStatusDTO;
import com.bloodlink.service.HealthService; // Import the service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final HealthService healthService; // Inject the Service, NOT the Repository

    @Autowired
    public TestController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from BloodLinkAI backend!";
    }

    @GetMapping("/api/health")
    public ResponseEntity<HealthStatusDTO> getHealthStatus() {
        HealthStatusDTO healthStatus = healthService.checkHealth();
        if ("DOWN".equals(healthStatus.getStatus())) {
            // Return a 503 Service Unavailable if the health check fails
            return ResponseEntity.status(503).body(healthStatus);
        }
        return ResponseEntity.ok(healthStatus);
    }
}