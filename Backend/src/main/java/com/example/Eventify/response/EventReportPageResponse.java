package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EventReportPageResponse {
    private EventDetails eventDetails;
    private EventStats eventStats;
    private FeedbackStats feedbackStats;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class EventDetails {
        private String id;
        private String title;
        private String dateTime;
        private String venue;
        private String description;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class EventStats {
        private int totalAttendees;
        private int totalRegistrations;
        private int eventCapacity;
        private double attendanceRate;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class FeedbackStats {
        private int totalFeedbacks;
        private double averageRating;
        private int positiveFeedback;
        private int negativeFeedback;
    }
}
