package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EventAttendancePageAdminResponse {

    private EventAttendanceMetrics metrics;   // Attendance metrics
    private List<AttendanceUser> users;      // List of users attending the event
    private EventDetails eventDetails;       // Basic event details

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class EventAttendanceMetrics {

        private int capacity;       // Total capacity for the event
        private int filled;         // Number of users who have registered for the event
        private int present;        // Number of users who are marked as present
        private int yetToCome;      // Number of users who haven't attended yet
        private int absent;         // Number of users who marked as absent
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class AttendanceUser {

        private String id;            // ID of the user
        private String name;        // Name of the user
        private String email;       // Email of the user
        private String registeredDate; // The date when the user registered
        private String currentStatus;  // Current status (Registered, Present, Absent, etc.)
        private String attending;     // Attending status (Yes/No or any custom field)
        private String attendanceCode; // A code associated with the user's attendance (QR code, etc.)
    }



    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class EventDetails {

        private String name;        // Event name
        private String description; // Description of the event
        private String location;    // Location of the event
        private Date date;          // Event date
    }
}
