package com.hallbooking.controller;

import com.hallbooking.dto.AuthResponse;
import com.hallbooking.dto.LoginRequest;
import com.hallbooking.dto.RegisterRequest;
import com.hallbooking.model.User;
import com.hallbooking.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginRequest.getPassword())) {
            User user = userOpt.get();
            String dummyToken = "jwt-session-" + user.getId() + "-" + System.currentTimeMillis();
            String fullName = user.getFirstName() + " " + user.getLastName();
            return ResponseEntity.ok(new AuthResponse(dummyToken, user.getId(), fullName, user.getEmail(), user.getPhone(), user.getRole()));
        }

        return ResponseEntity.badRequest().body("Invalid email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email address already registered!");
        }

        String role = (registerRequest.getRole() != null && !registerRequest.getRole().isEmpty())
                ? registerRequest.getRole() : "ROLE_USER";

        User newUser = new User(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getPhone(),
                role
        );

        User savedUser = userRepository.save(newUser);
        String dummyToken = "jwt-session-" + savedUser.getId() + "-" + System.currentTimeMillis();
        String fullName = savedUser.getFirstName() + " " + savedUser.getLastName();

        return ResponseEntity.ok(new AuthResponse(dummyToken, savedUser.getId(), fullName, savedUser.getEmail(), savedUser.getPhone(), savedUser.getRole()));
    }
}
