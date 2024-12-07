package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserRegisteredEventResponse {
    private List<Event> registered;
    private List<Event> attended;
    private List<Event> absent;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class Event{
        private String id;
        private String name;
        private String date;
        private String time;
        private String location;
        private String image;
        private String status;
    }
}
