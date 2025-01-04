package com.example.Eventify.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class EventFeedbackPageResponse {
    private EventDetails eventDetails;
    private FeedbackMetrics metrics;
    private List<Feedback> feedbacks;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Accessors(chain = true)
    public static class EventDetails {
        private String eventId;
        private String title;
        private String description;
        private String date;
        private String venue;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Accessors(chain = true)
    public static class FeedbackMetrics {
        private int totalFeedbacks;
        private double averageRating;
        private double positiveFeedback;
        private double negativeFeedback;
        private Map<String, Integer> feedBackCount ;
    }

    @Data
    public static class Feedback {
        private String id;
        private String name;
        private String feedback;
        private int rating;
    }
}
