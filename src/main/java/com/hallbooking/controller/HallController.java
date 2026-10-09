package com.hallbooking.controller;

import com.hallbooking.model.Hall;
import com.hallbooking.repository.HallRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/halls")
@CrossOrigin(origins = "*")
public class HallController {

    private final HallRepository hallRepository;

    public HallController(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    @GetMapping
    public ResponseEntity<List<Hall>> getAllHalls(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(hallRepository.findByCategory(category));
        }
        return ResponseEntity.ok(hallRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHallById(@PathVariable String id) {
        Optional<Hall> hall = hallRepository.findById(id);
        return hall.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Hall> createHall(@RequestBody Hall hall) {
        if (hall.getId() == null || hall.getId().isEmpty()) {
            hall.setId("hall-" + System.currentTimeMillis());
        }
        if (hall.getName() != null && !hall.getName().toLowerCase().contains("elite hall")) {
            hall.setName("Elite Hall - " + hall.getName());
        }
        Hall saved = hallRepository.save(hall);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHall(@PathVariable String id, @RequestBody Hall updatedFields) {
        return hallRepository.findById(id).map(existing -> {
            if (updatedFields.getName() != null) existing.setName(updatedFields.getName());
            if (updatedFields.getCategory() != null) existing.setCategory(updatedFields.getCategory());
            if (updatedFields.getCapacity() != null) existing.setCapacity(updatedFields.getCapacity());
            if (updatedFields.getPricePerDay() != null) existing.setPricePerDay(updatedFields.getPricePerDay());
            if (updatedFields.getLocation() != null) existing.setLocation(updatedFields.getLocation());
            if (updatedFields.getDescription() != null) existing.setDescription(updatedFields.getDescription());
            if (updatedFields.getImage() != null) existing.setImage(updatedFields.getImage());
            Hall saved = hallRepository.save(existing);
            return ResponseEntity.ok(saved);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHall(@PathVariable String id) {
        if (hallRepository.existsById(id)) {
            hallRepository.deleteById(id);
            return ResponseEntity.ok().body("Hall deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
