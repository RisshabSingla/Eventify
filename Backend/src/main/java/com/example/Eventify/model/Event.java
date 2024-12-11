package com.example.Eventify.model;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Accessors(chain = true)
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String name;
    private String description;
    private String location;
    private String date;
    private String time;
    private int maxCapacity;
    private int numberRegistered;
    private String category;
    private String coverImage;

    @DBRef(lazy = true)
    private User createdBy;  // Reference to User class (creator of the event)

    @DBRef(lazy = true)
    private List<User> registeredUsers;  // Reference to the registered users (List of User objects)

    @DBRef(lazy = true)
    private List<Feedback> feedbacks;  // Reference to Feedback class (List of feedbacks for the event)

    @DBRef(lazy = true)
    private List<UserStatus> userStatuses;  // Reference to UserStatus class (Tracking attendance and status)

    private List<Speaker> speakers;  // Array of speakers with name and bio

    private List<AgendaItem> agenda;  // Array of agenda items with date and description

    private String attendeeListPrivacy;  // Privacy setting for the attendee list (public, private, onlyRegisteredUsers)

    // Getters and Setters

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class Speaker {
        private String name;
        private String bio;

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class AgendaItem {
        private String description;
        private String time;
    }


    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    @Getter
    @Setter
    @Accessors(chain = true)
    public static class Media {
        private String type;
        private String src;
    }
}
