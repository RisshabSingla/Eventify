package com.example.Eventify.request;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EditEventRequest {

    private String eventTitle;
    private String eventDescription;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String eventCategory;
    private int registrationLimit;
    private String eventTags;
    private String coverImage;
    private List<AgendaItemRequest> agenda;
    private List<SpeakerRequest> speakers;
    private String attendeeList;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class AgendaItemRequest {
        private String agendaItem;
        private String startTime;

        // Getters and Setters
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class SpeakerRequest {
        private String name;
        private String bio;

        // Getters and Setters
    }
}
