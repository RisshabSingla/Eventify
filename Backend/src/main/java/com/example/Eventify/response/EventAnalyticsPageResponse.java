package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EventAnalyticsPageResponse {
    private String id;
    private String name;
    private int totalRegistrations;
    private int actualAttendance;
    private double feedbackRating;
    private int totalFeedbackCount;
    private Map<String, Integer> feedbackCounts;
    private List<String> topFeedbacks;
}
