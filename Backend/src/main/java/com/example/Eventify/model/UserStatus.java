package com.example.Eventify.model;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Accessors(chain = true)
@Document(collection = "user_statuses")
public class UserStatus {

    @Id
    private String id;

    @DBRef
    private Event eventId;  // Reference to Event class

    @DBRef
    private User userId;  // Reference to User class

    private String currentStatus;  // (Registered, Present, Yet to come, Attended, Absent)

    // Getters and Setters

    public UserStatus(Event eventId, User userId, String currentStatus) {
        this.eventId = eventId;
        this.userId = userId;
        this.currentStatus = currentStatus;
    }

    // Default constructor and other methods
}

