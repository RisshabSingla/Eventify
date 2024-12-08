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
public class EditEventDetailsResponse {

    private String eventId;
    private String eventTitle;
    private String eventDescription;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String eventCategory;
    private int registrationLimit;
    private String eventTags;
    private String coverImage;
    private List<AgendaItem> agenda;
    private List<Speaker> speakers;
    private String attendeeList;  // 'public' | 'private' | 'Only to Registered Users'

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class AgendaItem {
        private String agendaItem;
        private String startTime;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class Speaker {
        private String name;
        private String bio;
    }
}
