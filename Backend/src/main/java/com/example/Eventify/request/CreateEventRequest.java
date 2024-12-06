package com.example.Eventify.request;

import com.example.Eventify.model.Event;
import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class CreateEventRequest {
    private String name;
    private String description;
    private String location;
    private String date;
    private String time;
    private int maxCapacity;
    private String category;
    private String coverImage;
    private List<Event.Speaker> speakers;
    private List<Event.AgendaItem> agenda;
    private String attendeeListPrivacy;
}
