package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class MarkAttendanceResponse {
    public String currentStatus;
}
