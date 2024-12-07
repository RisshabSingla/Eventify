package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserFeedbackEventDetailsResponse {
    private String eventId;  // Unique identifier for the event
    private String name;  // Name of the event
    private String location;  // Location of the event
    private String date;  // Date of the event (e.g., "YYYY-MM-DD")
    private String time;  // Time of the event (e.g., "HH:mm:ss")
}
