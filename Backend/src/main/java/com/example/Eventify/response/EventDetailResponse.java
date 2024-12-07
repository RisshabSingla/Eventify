package com.example.Eventify.response;


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
public class EventDetailResponse {
    private String title;
    private String description;
    private String location;
    private String date;
    private int registrationLimit;
    private int filledSeats;
    private String category;
    private String coverImage;

    private List<Event.Speaker> speakers;  // Array of speakers with name and bio

    private List<Event.AgendaItem> agenda;  // Array of agenda items with date and description

    private String attendeeListPrivacy;

    private List<Event.Media> media;

}
