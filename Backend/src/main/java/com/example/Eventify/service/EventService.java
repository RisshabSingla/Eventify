package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.Feedback;
import com.example.Eventify.model.Notification;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.AdminEventAnalyticsResponse;
import com.example.Eventify.response.AdminEventAttendanceResponse;
import com.example.Eventify.response.EventCreateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public EventCreateResponse createEvent(CreateEventRequest request, User currentUser) {

        Event event = new Event()
                .setName(request.getEventTitle())
                .setDescription(request.getEventDescription())
                .setLocation(request.getEventLocation())
                .setDate(request.getEventDate())
                .setTime(request.getEventTime())
                .setMaxCapacity(request.getRegistrationLimit())
                .setCategory(request.getEventCategory())
                .setCoverImage(request.getCoverImage())
                .setSpeakers(request.getSpeakers())
                .setAgenda(request.getAgenda())
                .setAttendeeListPrivacy(request.getAttendeeList())
                .setCreatedBy(currentUser);

        Event savedEvent = eventRepository.save(event);

        if (currentUser.getCreatedEvents() == null) {
            currentUser.setCreatedEvents(new ArrayList<>());
        }

        currentUser.getCreatedEvents().add(savedEvent);
        userRepository.save(currentUser);

        Notification notification = new Notification().
                setType("Event Created").setEventId(savedEvent)
                .setDescription("Event Created " + event.getName())
                .setTimeStamp(new Date());

        notificationRepository.save(notification);

        return new EventCreateResponse()
                .setName(savedEvent.getName())
                .setDescription(savedEvent.getDescription())
                .setLocation(savedEvent.getLocation())
                .setDate(savedEvent.getDate())
                .setTime(savedEvent.getTime())
                .setMaxCapacity(savedEvent.getMaxCapacity())
                .setCategory(savedEvent.getCategory())
                .setCoverImage(savedEvent.getCoverImage())
                .setSpeakers(savedEvent.getSpeakers())
                .setAgenda(savedEvent.getAgenda())
                .setAttendeeListPrivacy(savedEvent.getAttendeeListPrivacy());
    }


    public ArrayList<Event> getAllAdminEvents() {
        return (ArrayList<Event>) eventRepository.findAll();
    }


    public AdminEventAnalyticsResponse getOverallEventAnalytics(User currentUser) {

        return new AdminEventAnalyticsResponse()
                .setTotalCreatedEvents(currentUser.getCreatedEvents().size())
                .setTotalAttendedUsers(getTotalAttendedUsers(currentUser))
                .setAverageFeedbackRating(getAverageFeedbackRating(currentUser))
                .setTotalRegisteredUsers(getTotalRegisteredUsers(currentUser));
    }

    public int getTotalAttendedUsers(User currentUser) {

        if (currentUser == null || currentUser.getCreatedEvents() == null) {
            System.out.println("No events found for the user.");
            return 0;
        }

        return (int) currentUser.getCreatedEvents().stream()
                .filter(event -> event.getUserStatuses() != null)
                .flatMap(event -> event.getUserStatuses().stream())
                .filter(userStatus -> "Attended".equals(userStatus.getCurrentStatus()))
                .count();


    }

    public int getTotalRegisteredUsers(User currentUser) {

        if (currentUser == null || currentUser.getCreatedEvents() == null) {
            System.out.println("No events found for the user.");
            return 0;
        }

        return (int) currentUser.getCreatedEvents().stream()
                .filter(event -> event.getRegisteredUsers() != null)
                .mapToLong(event -> event.getRegisteredUsers().size())
                .sum();
    }

    public int getAverageFeedbackRating(User currentUser) {


        if (currentUser == null || currentUser.getCreatedEvents() == null) {
            System.out.println("No events found for the user.");
            return 0;
        }

        return (int) currentUser.getCreatedEvents().stream()
                .filter(event -> event != null && event.getFeedbacks() != null)
                .flatMap(event -> event.getFeedbacks().stream())
                .filter(Objects::nonNull)
                .mapToInt(Feedback::getOverallRating)
                .average()
                .orElse(0);
    }


    public AdminEventAttendanceResponse getOverallAttendanceAnalytics(User currentUser){
        int attendedUsers = getTotalAttendedUsers(currentUser);
        int registeredUsers = getTotalRegisteredUsers(currentUser);
        return new AdminEventAttendanceResponse()
                .setTotalRegisteredUsers(registeredUsers)
                .setTotalAttendedUsers(attendedUsers)
                .setAttendanceRate(registeredUsers == 0 ? 0 : (attendedUsers * 100) / registeredUsers)
                .setTotalNoShowUsers(registeredUsers - attendedUsers);
    }
}
