package com.example.Eventify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String type;
    private String description;
    private String timeStamp;

    @DBRef
    private Event eventId;  // Reference to Event class

    // Getters and Setters

    public Notification(String type, String description, String timeStamp, Event eventId) {
        this.type = type;
        this.description = description;
        this.timeStamp = timeStamp;
        this.eventId = eventId;
    }

    // Default constructor and other methods
}

