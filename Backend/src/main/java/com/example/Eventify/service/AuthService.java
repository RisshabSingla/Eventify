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

    private final NotificationRepository notificationRepository;


    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            NotificationRepository notificationRepository, EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
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

        User savedUser = userRepository.save(user);

        // Send a confirmation email
        String subject = "Account Created Successfully";
        String text = "<html><body>"
                + "<p>Dear " + user.getName() + ",</p>"
                + "<p>Your account has been created successfully. Welcome to our platform!</p>"
                + "<p>Regards,</p>"
                + "<p><b>Team Eventify</b></p>"
                + "</body></html>";

        try {
            emailService.sendEmail(user.getEmail(), subject, text);
        } catch (Exception e) {
            System.out.println(e);
        }

        return savedUser;
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
