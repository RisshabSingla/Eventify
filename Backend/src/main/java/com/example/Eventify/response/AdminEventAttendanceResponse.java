package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AdminEventAttendanceResponse {
    private  int totalRegisteredUsers;
    private int totalAttendedUsers;
    private int attendanceRate;
    private int totalNoShowUsers;
}
