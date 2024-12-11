package com.example.Eventify.controller;


import com.example.Eventify.model.User;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.LoginRequest;
import com.example.Eventify.request.RegisterRequest;
import com.example.Eventify.response.LoginResponse;
import com.example.Eventify.response.RegisterResponse;
import com.example.Eventify.service.AuthService;
import com.example.Eventify.service.DeviceLocationService;
import com.example.Eventify.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequestMapping("/auth")
@RestController
public class AuthController {
    private final JWTService jwtService;

    private final AuthService authenticationService;

    private final UserRepository userRepository;

    public AuthController(JWTService jwtService, AuthService authenticationService, UserRepository userRepository, DeviceLocationService deviceLocationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerUserDto) {
        Optional<User> existingUser = userRepository.findByEmail(registerUserDto.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }

        User registeredUser = authenticationService.signup(registerUserDto);
        RegisterResponse registerResponse = new RegisterResponse()
                .setId(registeredUser.getId())
                .setEmail(registeredUser.getEmail())
                .setName(registeredUser.getName())
                .setRole(registeredUser.getRole());
        return ResponseEntity.ok(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest loginUserDto, HttpServletRequest request) {
        try {
            if (loginUserDto == null) {
                return ResponseEntity.badRequest().body(null);
            }

            User authenticatedUser = authenticationService.authenticate(loginUserDto, request);

            if (authenticatedUser == null) {
                return ResponseEntity.badRequest().body(null);
            }

            String jwtToken = jwtService.generateToken(authenticatedUser);

            if (jwtToken == null || jwtToken.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }

            LoginResponse loginResponse = new LoginResponse()
                    .setToken(jwtToken)
                    .setExpiresIn(jwtService.getExpirationTime())
                    .setRole(authenticatedUser.getRole());

            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
