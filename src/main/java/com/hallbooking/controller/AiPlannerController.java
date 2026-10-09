package com.hallbooking.controller;

import com.hallbooking.model.Hall;
import com.hallbooking.repository.HallRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai-planner")
@CrossOrigin(origins = "*")
public class AiPlannerController {

    private final HallRepository hallRepository;

    public AiPlannerController(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    @PostMapping("/recommend")
    public ResponseEntity<?> recommendEventPlan(@RequestBody Map<String, Object> req) {
        String eventType = (String) req.getOrDefault("eventType", "Marriage Hall");
        Integer guestCount = Integer.valueOf(req.getOrDefault("guestCount", 300).toString());
        Double budget = Double.valueOf(req.getOrDefault("budget", 150000).toString());
        String location = (String) req.getOrDefault("location", "Central City");

        List<Hall> allHalls = hallRepository.findAll();

        List<Map<String, Object>> recommendations = allHalls.stream().map(hall -> {
            int score = 75;

            if (hall.getCapacity() >= guestCount) score += 15;
            if (hall.getCategory().equalsIgnoreCase(eventType)) score += 10;
            if (hall.getLocation().toLowerCase().contains(location.toLowerCase())) score += 10;

            score = Math.min(99, Math.max(65, score));

            Map<String, Object> map = new HashMap<>();
            map.put("hall", hall);
            map.put("recommendationScore", score);
            map.put("estimatedTotal", hall.getPricePerDay() + (guestCount * 450) + 15000);
            return map;
        }).sorted((a, b) -> Integer.compare((int) b.get("recommendationScore"), (int) a.get("recommendationScore")))
          .limit(3)
          .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "success", true,
                "recommendations", recommendations,
                "eventType", eventType,
                "guestCount", guestCount,
                "budget", budget
        ));
    }
}
