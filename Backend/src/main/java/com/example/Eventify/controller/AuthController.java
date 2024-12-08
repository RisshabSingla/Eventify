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
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerUserDto) {
        Optional<User> existingUser = userRepository.findByEmail(registerUserDto.getEmail());

        if (existingUser.isPresent()) {
            // If the user exists, return a 400 Bad Request with an error message
            return ResponseEntity.badRequest().body("User with this email already exists");
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
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest loginUserDto,  HttpServletRequest request) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto, request);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime()).setRole(authenticatedUser.getRole());
        return ResponseEntity.ok(loginResponse);
    }
}
