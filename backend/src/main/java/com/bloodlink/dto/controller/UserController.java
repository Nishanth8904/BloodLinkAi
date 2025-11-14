package com.bloodlink.dto.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @GetMapping("/api/users")
    public List<Map<String, Object>> getUsers() {
        return Arrays.asList(
            createUser(1, "Nishanth", "Admin", "nishanth@bloodlinkai.com"),
            createUser(2, "Rahul", "Manager", "rahul@bloodlinkai.com"),
            createUser(3, "Karthick", "Technician", "karthick@bloodlinkai.com")
        );
    }

    private Map<String, Object> createUser(Integer id, String name, String role, String email) {
        Map<String, Object> user = new HashMap<>();
        user.put("id", id);
        user.put("name", name);
        user.put("role", role);
        user.put("email", email);
        return user;
    }
}