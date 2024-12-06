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
@Document(collection = "feedbacks")
public class Feedback {

    @Id
    private String id;

    @DBRef
    private User userId;  // Reference to User class

    @DBRef
    private Event eventId;  // Reference to Event class

    private int overallRating;
    private int venueRating;
    private int speakerRating;
    private String comments;
    private String suggestions;

    // Getters and Setters

    public Feedback(User userId, Event eventId, int overallRating, int venueRating, int speakerRating,
                    String comments, String suggestions) {
        this.userId = userId;
        this.eventId = eventId;
        this.overallRating = overallRating;
        this.venueRating = venueRating;
        this.speakerRating = speakerRating;
        this.comments = comments;
        this.suggestions = suggestions;
    }

    // Default constructor and other methods
}
