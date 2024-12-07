package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.Feedback;
import com.example.Eventify.model.Notification;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

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


    public AdminEventAttendanceResponse getOverallAttendanceAnalytics(User currentUser) {
        int attendedUsers = getTotalAttendedUsers(currentUser);
        int registeredUsers = getTotalRegisteredUsers(currentUser);
        return new AdminEventAttendanceResponse()
                .setTotalRegisteredUsers(registeredUsers)
                .setTotalAttendedUsers(attendedUsers)
                .setAttendanceRate(registeredUsers == 0 ? 0 : (attendedUsers * 100) / registeredUsers)
                .setTotalNoShowUsers(registeredUsers - attendedUsers);
    }


    public AdminEventFeedbackAnalyticsResponse getOverallFeedbackAnalytics(User currentUser) {
        return new AdminEventFeedbackAnalyticsResponse()
                .setTotalFeedbacks(getTotalFeedbacks(currentUser))
                .setAverageRating(getAverageFeedbackRating(currentUser))
                .setHighestRating(getHighestRating(currentUser));
    }


    public int getTotalFeedbacks(User currentUser) {
        return (int) currentUser.getCreatedEvents().stream()
                .filter(event -> event != null && event.getFeedbacks() != null)
                .flatMap(event -> event.getFeedbacks().stream())
                .filter(Objects::nonNull)
                .count();
    }

    public int getHighestRating(User currentUser) {
        return (int) currentUser.getCreatedEvents().stream()
                .filter(event -> event != null && event.getFeedbacks() != null)
                .flatMap(event -> event.getFeedbacks().stream())
                .filter(Objects::nonNull)
                .mapToInt(Feedback::getOverallRating)
                .max()
                .orElse(0);
    }


    public List<AdminEventRecentFeedbackResponse> getRecentFeedbacks(User currentUser) {
        List<Event> createdEvents = currentUser.getCreatedEvents();

        if (createdEvents == null || createdEvents.isEmpty()) {
            return Collections.emptyList();
        }

        List<Feedback> feedbacks = createdEvents.stream()
                .filter(Objects::nonNull)
                .filter(event -> event.getFeedbacks() != null)
                .flatMap(event -> event.getFeedbacks().stream())
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(Feedback::getCreatedDate).reversed()) // Sort by createdDate in descending order
                .toList();

        List<Feedback> recentFeedbacks = feedbacks.stream()
                .limit(20)
                .toList();

        return recentFeedbacks.stream()
                .map(feedback -> new AdminEventRecentFeedbackResponse()
                        .setName(feedback.getUserId().getName())
                        .setComment(feedback.getComments())
                        .setRating(feedback.getOverallRating()))
                .collect(Collectors.toList());
    }

    public EventRegiserResponse registerEvent(String eventId, User currentUser) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return new EventRegiserResponse("Event not found", -1);
        }

        if (currentUser.getRegisteredEvents() != null && event != null &&
                currentUser.getRegisteredEvents().stream().anyMatch(e -> e.getId().equals(event.getId()))) {
            return new EventRegiserResponse("User already registered for the event", event.getNumberRegistered());
        }


        if (event.getNumberRegistered() == event.getMaxCapacity()) {
            return new EventRegiserResponse("Event is full", event.getNumberRegistered());
        }

        if (event.getRegisteredUsers() == null) {
            event.setRegisteredUsers(new ArrayList<>());
        }
        event.getRegisteredUsers().add(currentUser);
        event.setNumberRegistered(event.getNumberRegistered() + 1);
        eventRepository.save(event);

        if (currentUser.getRegisteredEvents() == null) {
            currentUser.setRegisteredEvents(new ArrayList<>());
        }

        currentUser.getRegisteredEvents().add(event);
        userRepository.save(currentUser);


        Notification notification = new Notification().
                setDescription("User: " + currentUser.getName()
                        + " Registered for the Event: " + event.getName()).
                setEventId(event)
                .setType("Event Registration")
                .setTimeStamp(new Date());
        notificationRepository.save(notification);

        return new EventRegiserResponse("Event registered successfully", (event.getRegisteredUsers().size()));
    }

    public EventRegiserResponse unregisterEvent(String eventId, User currentUser) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return new EventRegiserResponse("Event not found", -1);
        }

        if (currentUser.getRegisteredEvents() != null && event != null &&
                currentUser.getRegisteredEvents().stream().anyMatch(e -> e.getId().equals(event.getId()))) {

            currentUser.getRegisteredEvents().removeIf(e -> e.getId().equals(event.getId()));

            if (event.getRegisteredUsers() != null) {
                event.getRegisteredUsers().removeIf(user -> user.getId().equals(currentUser.getId()));
            }

            event.setNumberRegistered(event.getNumberRegistered() - 1);

            userRepository.save(currentUser);
            eventRepository.save(event);

            return new EventRegiserResponse("Successfully unregistered from the event", event.getNumberRegistered());
        } else {
            return new EventRegiserResponse("User is not registered for the event", -1);
        }

    }




    public EventDetailResponse getEventDetail(String eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }
        return new EventDetailResponse()
                .setTitle(event.getName())
                .setDescription(event.getDescription())
                .setLocation(event.getLocation())
                .setDate(event.getDate())
                .setRegistrationLimit(event.getMaxCapacity())
                .setFilledSeats(event.getNumberRegistered())
                .setCategory(event.getCategory())
                .setCoverImage(event.getCoverImage())
                .setSpeakers(event.getSpeakers())
                .setAgenda(event.getAgenda())
                .setAttendeeListPrivacy(event.getAttendeeListPrivacy());
    }


    public boolean checkIfRegistered(String eventId, User currentUser) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return false;
        }
        return event.getRegisteredUsers() != null &&
                event.getRegisteredUsers().stream().anyMatch(user -> user.getId().equals(currentUser.getId()));
    }

}
