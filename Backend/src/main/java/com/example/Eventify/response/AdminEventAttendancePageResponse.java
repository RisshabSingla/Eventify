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
public class AdminEventAttendancePageResponse {
    List<AdminEventListResponse> events;
    AdminEventAttendanceResponse metrics;
}
