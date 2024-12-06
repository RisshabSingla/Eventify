package com.example.Eventify.service;

import com.example.Eventify.model.Notification;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.LoginRequest;
import com.example.Eventify.request.RegisterRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final NotificationRepository notificationRepository; // Add this line heri

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            NotificationRepository notificationRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationRepository = notificationRepository;
    }

    public User signup(RegisterRequest input) {

        User user = new User()
                .setName(input.getName())
                .setEmail(input.getEmail())
                .setRole(input.getRole())
                .setPassword(passwordEncoder.encode(input.getPassword()));

        Notification notification = new Notification()
                .setDescription("Account Created: " + user.getName())
                .setType("User Registration")
                .setTimeStamp(new Date());

        notificationRepository.save(notification);

        return userRepository.save(user);
    }

    public User authenticate(LoginRequest input) {


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}
