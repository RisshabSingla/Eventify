package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EventAttendanceQRResponse {
    private String id;               // Event ID
    private String name;             // Event Name
    private String date;             // Event Date
    private String time;             // Event Time
    private String location;         // Event Location
    private String status;           // Event Status
    private String attendanceCode;   // Unique Attendance Code
}
