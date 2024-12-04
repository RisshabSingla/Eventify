package com.example.Eventify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;
    private String password;
    private String name;
    private String role;
    private String profileImage;
    private String phoneNumber;
    private String lastLogin;

    @DBRef
    private List<Event> registeredEvents;  // Reference to Event class

    @DBRef
    private List<Feedback> feedbacksGiven;  // Reference to Feedback class

    // Getters and Setters

    public User(String email, String password, String name, String role, String profileImage,
                String phoneNumber, String lastLogin, List<Event> registeredEvents, List<Feedback> feedbacksGiven) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.profileImage = profileImage;
        this.phoneNumber = phoneNumber;
        this.lastLogin = lastLogin;
        this.registeredEvents = registeredEvents;
        this.feedbacksGiven = feedbacksGiven;
    }

    // Default constructor and other methods
}

