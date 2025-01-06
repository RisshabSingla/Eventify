package com.example.Eventify.service;

import com.example.Eventify.model.Notification;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.LoginRequest;
import com.example.Eventify.request.RegisterRequest;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final NotificationRepository notificationRepository;

    private final DeviceLocationService deviceLocationService;

    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            NotificationRepository notificationRepository, DeviceLocationService deviceLocationService, EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationRepository = notificationRepository;
        this.deviceLocationService = deviceLocationService;
        this.emailService = emailService;
    }

    public User signup(RegisterRequest input) {

        User user = new User()
                .setName(input.getName())
                .setEmail(input.getEmail())
                .setRole(input.getRole())
                .setPassword(passwordEncoder.encode(input.getPassword()))
                .setLastLogin(String.valueOf(new Date()))
                .setRegisteredDate(String.valueOf(new Date()));

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
            System.out.println(e.getMessage());
        }

        return savedUser;
    }

    public User authenticate(LoginRequest input, HttpServletRequest request) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );

            // Capture device and location details
            String deviceDetails = deviceLocationService.getDeviceDetails(request);
            String ipAddress = deviceLocationService.getIpAddress(request);
            String location = deviceLocationService.getLocation(ipAddress);

            // Create the email content
            String subject = "New Login to Your Account";
            String text = "<html><body>"
                    + "<p>Dear User,</p>"
                    + "<p>A new login to your account was detected:</p>"
                    + "<ul>"
                    + "<li><b>Device Details:</b> " + deviceDetails + "</li>"
                    + "<li><b>Location:</b> " + location + "</li>"
                    + "<li><b>IP Address:</b> " + ipAddress + "</li>"
                    + "</ul>"
                    + "<p>If this wasn't you, please reset your password immediately.</p>"
                    + "<p>Regards,</p>"
                    + "<p><b>Team Eventify</b></p>"
                    + "</body></html>";

            // Send email notification
            try {
                emailService.sendEmail(input.getEmail(), subject, text);
            } catch (MessagingException e) {
                System.err.println("Error sending login notification email: " + e.getMessage());
            }

            // Fetch the user details from the repository after authentication
            Optional<User> userOptional = userRepository.findByEmail(input.getEmail());
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User not found with email: " + input.getEmail());
            }

            userOptional.get().setLastLogin(String.valueOf(new Date()));
            userRepository.save(userOptional.get());

            return userOptional.get();

        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid email or password.", e);
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred during authentication.", e);
        }
    }
}
