package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserGivenFeedbackResponse {
    private String eventName;        // Name of the event
    private String description;      // Description of the event
    private String image;            // URL or path of the event image
    private String date;             // Event date (e.g., "2024-12-07")
    private String location;         // Location of the event
    private int rating;           // Overall rating (e.g., 4.5)
    private int speakerRating;    // Speaker-specific rating
    private int venueRating;      // Venue-specific rating
    private String comments;         // User comments on the event
    private String suggestions;      // User suggestions for improvement
}
