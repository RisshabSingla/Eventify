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

    private String eventTitle;
    private String eventDescription;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String eventCategory;
    private int registrationLimit;
    private String eventTags;
    private String coverImage;
    private List<Event.AgendaItem> agenda;
    private List<Event.Speaker> speakers;
    private String attendeeList;

}
