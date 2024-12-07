package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class ExploreEventsResponse {
    private String id;
    private String title;
    private String description;
    private String date;
    private String location;
    private String image;
}
