package com.example.Eventify.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class AdminDashboardItemsResponse {

    private List<Metric> metrics;
    private List<Event> upcomingEvents;
    private List<Activity> recentActivities;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Accessors(chain = true)
    public static class Metric {
        private String title;
        private long value;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Accessors(chain = true)
    public static class Event {
        private String id;
        private String name;
        private String date;
        private String time;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Accessors(chain = true)
    public static class Activity {
        private String description;
        private String detail;
        private String timestamp;
    }
}
