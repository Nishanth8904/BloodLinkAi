package com.bloodlink.dto.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Enable CORS for React
public class ChatController {

    @PostMapping("/api/chat")
    public Response chat(@RequestBody ChatRequest request) {
        String text = request.getText();
        // Replace with AI/text generation logic
        return new Response("You said: " + text);
    }

    // DTOs for request/response mapping
    public static class ChatRequest {
        private String text;
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }

    public static class Response {
        private String reply;
        public Response(String reply) { this.reply = reply; }
        public String getReply() { return reply; }
        public void setReply(String reply) { this.reply = reply; }
    }
}
