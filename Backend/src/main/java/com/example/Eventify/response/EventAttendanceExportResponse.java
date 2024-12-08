package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EventAttendanceExportResponse {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class EventAttendanceData {
        private String eventName;
        private List<AttendanceUser> userStatuses;

    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class AttendanceUser {
        private String name;
        private String email;
        private String currentStatus;
        private String attendanceCode;
        private String registeredDate;

    }
}
