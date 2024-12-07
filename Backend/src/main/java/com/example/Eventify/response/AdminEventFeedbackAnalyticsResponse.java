package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AdminEventFeedbackAnalyticsResponse {
    private int totalFeedbacks;
    private double averageRating;
    private int highestRating;
}
