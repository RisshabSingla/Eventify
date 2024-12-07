package com.example.Eventify.service;

import com.example.Eventify.model.*;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.NotificationRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.repository.UserStatusRepository;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

    @Autowired
    private UserStatusRepository userStatusRepository;


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

        Notification notification = new Notification().setType("Event Created").setEventId(savedEvent)
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
                .setAttendeeListPrivacy(savedEvent.getAttendeeListPrivacy())
                .setId(savedEvent.getId());
    }

    public List<ExploreEventsResponse> exploreEvents(){

        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(event -> new ExploreEventsResponse()
                        .setId(event.getId())
                        .setTitle(event.getName())
                        .setDescription(event.getDescription())
                        .setDate(event.getDate())
                        .setLocation(event.getLocation())
                        .setImage("https://picsum.photos/400/200"))
                .collect(Collectors.toList());
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
                .sorted(Comparator.comparing(Feedback::getCreatedDate).reversed()) // Sort by createdDate in descending
                // order
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

        UserStatus userStatus = new UserStatus()
                .setCurrentStatus("Registered")
                .setUserId(currentUser)
                .setEventId(event)
                .setRegisteredDate(new Date());

        userStatusRepository.save(userStatus);

        if (event.getUserStatuses() == null) {
            event.setUserStatuses(new ArrayList<>());
        }
        event.getUserStatuses().add(userStatus);
        eventRepository.save(event);

        if (currentUser.getRegisteredEvents() == null) {
            currentUser.setRegisteredEvents(new ArrayList<>());
        }

        currentUser.getRegisteredEvents().add(event);
        userRepository.save(currentUser);

        Notification notification = new Notification().setDescription("User: " + currentUser.getName()
                        + " Registered for the Event: " + event.getName()).setEventId(event)
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


    public UserRegisteredEventResponse getRegisteredEvents(User currentUser) {
        List<UserRegisteredEventResponse.Event> registered = new ArrayList<>();
        List<UserRegisteredEventResponse.Event> attended = new ArrayList<>();
        List<UserRegisteredEventResponse.Event> absent = new ArrayList<>();
        System.out.println("Hello");
        for (Event event : currentUser.getRegisteredEvents()) {
            System.out.println("Event name: " + event.getName());
            if (event.getUserStatuses() == null) {
                registered.add(
                        new UserRegisteredEventResponse.Event()
                                .setId(event.getId())
                                .setName(event.getName())
                                .setDate(event.getDate())
                                .setTime(event.getTime())
                                .setLocation(event.getLocation())
                                .setImage(event.getCoverImage())
                                .setStatus("Registered")
                );
            } else {
                // If userStatuses is not null, check the status using streams
                event.getUserStatuses().stream()
                        .filter(userStatus -> userStatus.getUserId().getId().equals(currentUser.getId()))  // Filter by the current user
                        .findFirst()
                        .ifPresent(userStatus -> {
                            // Categorize the event based on the user's current status
                            String status = userStatus.getCurrentStatus();
                            System.out.println(status);
                            UserRegisteredEventResponse.Event eventResponse = new UserRegisteredEventResponse.Event()
                                    .setId(event.getId())
                                    .setName(event.getName())
                                    .setDate(event.getDate())
                                    .setTime(event.getTime())
                                    .setLocation(event.getLocation())
                                    .setImage(event.getCoverImage());

                            if ("Attended".equalsIgnoreCase(status)) {
                                System.out.println("Inside attended");
                                eventResponse.setStatus("Attended");
                                attended.add(eventResponse);
                            } else if ("Absent".equalsIgnoreCase(status)) {
                                System.out.println("Inside absent");
                                eventResponse.setStatus("Absent");
                                absent.add(eventResponse);
                            }else{
                                System.out.println("Inside registered");
                                eventResponse.setStatus("Registered");
                                registered.add(eventResponse);
                            }
                        });
            }
        }

        return new UserRegisteredEventResponse(registered, attended, absent);

    }


    public EventAttendancePageAdminResponse getEventAttendancePageAdminData(String eventId, User currentUser) throws ParseException {

        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date eventDate = formatter.parse(event.getDate());
        Date todayDate = formatter.parse(formatter.format(new Date()));

        EventAttendancePageAdminResponse.EventDetails eventDetails = new EventAttendancePageAdminResponse.EventDetails()
                .setName(event.getName())
                .setDescription(event.getDescription())
                .setLocation(event.getLocation())
                .setDate(eventDate);


        EventAttendancePageAdminResponse.EventAttendanceMetrics metrics;
        List<EventAttendancePageAdminResponse.AttendanceUser> users;

        List<UserStatus> userStatuses = event.getUserStatuses() != null ? event.getUserStatuses() : Collections.emptyList();

        if (eventDate.before(todayDate)) {
            // Only Registered users
            metrics = new EventAttendancePageAdminResponse.EventAttendanceMetrics()
                    .setFilled(event.getNumberRegistered())
                    .setAbsent(0)
                    .setCapacity(event.getMaxCapacity())
                    .setPresent(0)
                    .setYetToCome(0);

            users = userStatuses.stream()
                    .filter(userStatus -> userStatus != null && "Registered".equals(userStatus.getCurrentStatus()))
                    .map(userStatus ->
                            new EventAttendancePageAdminResponse.AttendanceUser()
                                    .setId(userStatus.getUserId().getId())
                                    .setName(userStatus.getUserId().getName())
                                    .setEmail(userStatus.getUserId().getEmail())
                                    .setRegisteredDate(String.valueOf(userStatus.getRegisteredDate()))
                                    .setCurrentStatus(userStatus.getCurrentStatus())
                                    .setAttending("No")
                                    .setAttendanceCode(userStatus.getAttendanceCode())
                    ).toList();

        } else if (eventDate.after(todayDate)) {
            int totalRegistered = event.getNumberRegistered();
            int presentUsers = getPresentUsers(event);

            metrics = new EventAttendancePageAdminResponse.EventAttendanceMetrics()
                    .setFilled(totalRegistered)
                    .setAbsent(totalRegistered - presentUsers)
                    .setCapacity(event.getMaxCapacity())
                    .setPresent(presentUsers)
                    .setYetToCome(0);


            users = userStatuses.stream()
                    .filter(Objects::nonNull)
                    .map(userStatus ->
                            new EventAttendancePageAdminResponse.AttendanceUser()
                                    .setId(userStatus.getUserId().getId())
                                    .setName(userStatus.getUserId().getName())
                                    .setEmail(userStatus.getUserId().getEmail())
                                    .setRegisteredDate(String.valueOf(userStatus.getRegisteredDate()))
                                    .setCurrentStatus(userStatus.getCurrentStatus())
                                    .setAttending("No")
                                    .setAttendanceCode(userStatus.getAttendanceCode())
                    ).toList();

        } else {

            int totalRegistered = event.getNumberRegistered();
            int presentUsers = getPresentUsers(event);

            metrics = new EventAttendancePageAdminResponse.EventAttendanceMetrics()
                    .setFilled(totalRegistered)
                    .setAbsent(0)
                    .setCapacity(event.getMaxCapacity())
                    .setPresent(presentUsers)
                    .setYetToCome(totalRegistered - presentUsers);

            users = userStatuses.stream()
                    .filter(Objects::nonNull)
                    .map(userStatus ->
                            new EventAttendancePageAdminResponse.AttendanceUser()
                                    .setId(userStatus.getUserId().getId())
                                    .setName(userStatus.getUserId().getName())
                                    .setEmail(userStatus.getUserId().getEmail())
                                    .setRegisteredDate(String.valueOf(userStatus.getRegisteredDate()))
                                    .setCurrentStatus(userStatus.getCurrentStatus())
                                    .setAttending(Objects.equals(userStatus.getCurrentStatus(), "Present") ? "Present" : "Yet to Come")
                                    .setAttendanceCode(userStatus.getAttendanceCode())
                    ).toList();

        }

        return new EventAttendancePageAdminResponse()
                .setEventDetails(eventDetails)
                .setMetrics(metrics)
                .setUsers(users);
    }


    public int getPresentUsers(Event event) {

        if (event == null || event.getUserStatuses() == null) {
            return 0;
        }

        List<UserStatus> userStatuses = event.getUserStatuses();

        long presentUsers = userStatuses.stream()
                .filter(userStatus -> userStatus != null && "Present".equals(userStatus.getCurrentStatus()))
                .count();

        return (int) presentUsers;
    }


    public MarkAttendanceResponse markAttendanceforEvent(String eventId, String userId){
        Event event = eventRepository.findById(eventId).orElse(null);
        User currentUser = userRepository.findById(userId).orElse(null);

        if (event == null || currentUser == null) {
            return new MarkAttendanceResponse().setCurrentStatus("Event or user not found");
        }

        List<UserStatus> userStatuses = event.getUserStatuses();

        if (userStatuses == null || userStatuses.isEmpty()) {
            return new MarkAttendanceResponse().setCurrentStatus("No user statuses found");
        }

        // Use streams to find the UserStatus for the current user
        UserStatus matchingStatus = userStatuses.stream()
                .filter(userStatus -> userStatus != null && userStatus.getUserId().getId().equals(currentUser.getId()))
                .findFirst()
                .orElse(null);

        if (matchingStatus == null) {
            return new MarkAttendanceResponse().setCurrentStatus("User not registered for this event");
        }

        // Update the status to "Present"
        matchingStatus.setCurrentStatus("Present");

        // Save the updated event
        eventRepository.save(event);
        userStatusRepository.save(matchingStatus);

        return new MarkAttendanceResponse().setCurrentStatus("Present");
    }

    public List<EventAttendanceQRResponse> getQRCodesforAttendance(User currentUser){

        SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
        String today = DATE_FORMAT.format(new Date());

        List<Event> eventsToday = currentUser.getRegisteredEvents().stream()
                .filter(event -> event.getDate().equals(today))
                .toList();

        return eventsToday.stream()
                .map(event -> {
                    Optional<UserStatus> userStatusOptional = userStatusRepository.findByUserIdAndEventId(currentUser.getId(), event.getId());
                    return userStatusOptional.map(userStatus ->
                            new EventAttendanceQRResponse(
                                    event.getId(),
                                    event.getName(),
                                    event.getDate(),
                                    event.getTime(),
                                    event.getLocation(),
                                    userStatus.getCurrentStatus(),
                                    Optional.ofNullable(userStatus.getAttendanceCode()).orElse("")  // Handle null attendanceCode
                            )
                    ).orElse(null);  // If no status is found, return null
                })
                .collect(Collectors.toList());
    }



    public List<UserAttendedEventsResponse> getAttendedEvents(User currentUser){
        // TODO: Change logic for getting attended events(right now only registered events)

        if(currentUser == null || currentUser.getRegisteredEvents() == null){
            return Collections.emptyList();
        }
        return currentUser.getRegisteredEvents().stream()
                .map(event ->
                        new UserAttendedEventsResponse()
                                .setDate(event.getDate())
                                .setName(event.getName())
                                .setTime(event.getTime())
                                .setLocation(event.getLocation())
                                .setId(event.getId())
                )
                .toList();
    }

    public UserFeedbackEventDetailsResponse getEventDetailsFeedback(String eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }
        return new UserFeedbackEventDetailsResponse()
                .setEventId(event.getId())
                .setName(event.getName())
                .setLocation(event.getLocation())
                .setDate(event.getDate())
                .setTime(event.getTime());
    }
}

