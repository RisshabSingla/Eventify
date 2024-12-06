package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AdminEventAnalyticsResponse {
    private int totalCreatedEvents;
    private int totalRegisteredUsers;
    private int totalAttendedUsers;
    private int averageFeedbackRating;
}
