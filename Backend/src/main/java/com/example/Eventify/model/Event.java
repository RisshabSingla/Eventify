package com.example.Eventify.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


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

    @DBRef
    private User createdBy;  // Reference to User class (creator of the event)

    @DBRef
    private List<User> registeredUsers;  // Reference to the registered users (List of User objects)

    @DBRef
    private List<Feedback> feedbacks;  // Reference to Feedback class (List of feedbacks for the event)

    @DBRef
    private List<UserStatus> userStatuses;  // Reference to UserStatus class (Tracking attendance and status)

    private List<Speaker> speakers;  // Array of speakers with name and bio

    private List<AgendaItem> agenda;  // Array of agenda items with date and description

    private String attendeeListPrivacy;  // Privacy setting for the attendee list (public, private, onlyRegisteredUsers)

    // Getters and Setters

    public Event(String name, String description, String location, String date, String time, int maxCapacity,
                 int numberRegistered, String category, String coverImage, User createdBy,
                 List<User> registeredUsers, List<Feedback> feedbacks, List<UserStatus> userStatuses,
                 List<Speaker> speakers, List<AgendaItem> agenda, String attendeeListPrivacy) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.time = time;
        this.maxCapacity = maxCapacity;
        this.numberRegistered = numberRegistered;
        this.category = category;
        this.coverImage = coverImage;
        this.createdBy = createdBy;
        this.registeredUsers = registeredUsers;
        this.feedbacks = feedbacks;
        this.userStatuses = userStatuses;
        this.speakers = speakers;
        this.agenda = agenda;
        this.attendeeListPrivacy = attendeeListPrivacy;
    }

    // Default constructor and other methods

    public static class Speaker {
        private String name;
        private String bio;

        public Speaker(String name, String bio) {
            this.name = name;
            this.bio = bio;
        }

        // Getters and Setters
    }

    public static class AgendaItem {
        private String description;
        private String date;

        public AgendaItem(String description, String date) {
            this.description = description;
            this.date = date;
        }

        // Getters and Setters
    }
}
