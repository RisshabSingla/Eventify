package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserDashboardItemsResponse {

    private UserDetail userDetails;
    private UserEventSummary userEventSummary;
    private UserStats userStats;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class UserDetail {
        private String userImageUrl;
        private String userName;
        private String userEmail;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class UserEventSummary {
        private long registeredEvents;
        private long upcomingEvents;
        private long eventsAttended;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class UserStats {
        private long totalEventsRegistered;
        private long feedbackGiven;
    }
}
