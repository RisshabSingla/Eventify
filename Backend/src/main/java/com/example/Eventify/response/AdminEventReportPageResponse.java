package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class AdminEventReportPageResponse {
    private ReportsMetrics metrics;
    private List<EventDTO> events;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Accessors(chain = true)
    public static class ReportsMetrics {
        private int totalEvents;
        private int totalFeedback;
        private int totalRegistrations;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Accessors(chain = true)
    public static class EventDTO {
        private String id;
        private String name;
        private String date;
        private String description;
    }
}
