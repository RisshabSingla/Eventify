package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserAttendedEventsResponse {

    private String id;
    private String name;
    private String date;
    private String time;
    private String location;
}
