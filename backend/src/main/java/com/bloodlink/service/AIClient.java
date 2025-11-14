package com.bloodlink.service;

import com.bloodlink.dto.AIPredictRequest;
import com.bloodlink.dto.AIPredictResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AIClient {

    private static final Logger logger = LoggerFactory.getLogger(AIClient.class);

    private final RestTemplate rest;
    private final String aiBase;

    public AIClient(@Value("${app.ai.base-url}") String aiBase) {
        this.rest = new RestTemplate();
        this.aiBase = aiBase;
        logger.info("AIClient initialized with base URL: {}", aiBase);
    }

    public AIPredictResponse predict(AIPredictRequest req) {
        try {
            String url = aiBase + "/predict";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<AIPredictRequest> entity = new HttpEntity<>(req, headers);

            logger.debug("Making prediction request to {}: {}", url, req);

            ResponseEntity<AIPredictResponse> response = rest.postForEntity(url, entity, AIPredictResponse.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                logger.debug("Prediction successful: {}", response.getBody());
                return response.getBody();
            } else {
                logger.error("AI service returned error status: {}", response.getStatusCode());
                return createFallbackResponse(req.getDonorId());
            }

        } catch (RestClientException e) {
            logger.error("Error calling AI service: {}", e.getMessage(), e);
            return createFallbackResponse(req.getDonorId());
        }
    }

    private AIPredictResponse createFallbackResponse(Integer donorId) {
        logger.warn("Using fallback prediction for donor: {}", donorId);
        // Simple fallback: return a moderate availability score
        return new AIPredictResponse(donorId, 0.5);
    }

    public boolean isHealthy() {
        try {
            String url = aiBase + "/health";
            ResponseEntity<String> response = rest.getForEntity(url, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            logger.error("AI service health check failed: {}", e.getMessage());
            return false;
        }
    }
}