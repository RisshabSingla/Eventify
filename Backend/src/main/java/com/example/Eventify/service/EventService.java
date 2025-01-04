package com.example.Eventify.service;

import com.example.Eventify.model.*;
import com.example.Eventify.repository.*;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.request.EditEventRequest;
import com.example.Eventify.response.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private FeedbackRepository feedbackRepository;


    public EventCreateResponse createEvent(CreateEventRequest request, User currentUser) {

        Event event = new Event()
                .setName(request.getEventTitle())
                .setDescription(request.getEventDescription())
                .setLocation(request.getEventLocation())
                .setDate(request.getEventDate())
                .setTime(request.getEventTime())
                .setMaxCapacity(request.getRegistrationLimit())
                .setCategory(request.getEventCategory())
                .setCoverImage(request.getCoverImage() != null && !request.getCoverImage().isEmpty()
                        ? request.getCoverImage()
                        : "https://picsum.photos/seed/" + UUID.randomUUID() + "/500/300")
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

    public List<ExploreEventsResponse> exploreEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        List<Event> events = eventRepository.findAll(pageable).getContent();
        if (events.isEmpty()) {
            return Collections.emptyList();
        }

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.now();

        return events.stream()
                .filter(event -> {
                    try {
                        LocalDate eventDate = LocalDate.parse(event.getDate(), dateFormatter);
                        return !eventDate.isBefore(today);
                    } catch (Exception e) {
                        return false;
                    }
                })
                .map(event -> new ExploreEventsResponse()
                        .setId(event.getId())
                        .setTitle(event.getName())
                        .setDescription(event.getDescription())
                        .setDate(event.getDate())
                        .setLocation(event.getLocation())
                        .setImage(event.getCoverImage()))
                .collect(Collectors.toList());
    }


    public List<Event> getAllAdminEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventRepository.findAll(pageable).getContent();
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
                .filter(userStatus -> "Present".equals(userStatus.getCurrentStatus()))
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
        int absentUsers = getAbsentUsers(currentUser);
        return new AdminEventAttendanceResponse()
                .setTotalRegisteredUsers(registeredUsers)
                .setTotalAttendedUsers(attendedUsers)
                .setAttendanceRate(registeredUsers == 0 ? 0 : (attendedUsers * 100) / (attendedUsers+absentUsers))
                .setTotalNoShowUsers(absentUsers);
    }

    public int getAbsentUsers(User currentUser){
        if (currentUser == null || currentUser.getCreatedEvents() == null) {
            System.out.println("No events found for the user.");
            return 0;
        }

        LocalDate currentDate = LocalDate.now();

        return (int) currentUser.getCreatedEvents().stream()
                .filter(event -> event.getDate() != null)
                .filter(event -> {
                    try {
                        LocalDate eventDate = LocalDate.parse(event.getDate());
                        return eventDate.isBefore(currentDate);
                    } catch (DateTimeParseException e) {
                        return false;
                    }
                })
                .filter(event -> event.getUserStatuses() != null)
                .flatMap(event -> event.getUserStatuses().stream())
                .filter(userStatus -> userStatus.getCurrentStatus() == null || !"Present".equals(userStatus.getCurrentStatus()))
                .count();
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

    @Transactional
    public EventRegiserResponse registerEvent(String eventId, User currentUser) throws MessagingException {
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

        String subject = "Event Registration Confirmation - " + event.getName();
        String text = "<html><body>"
                + "<p>Dear " + currentUser.getName() + ",</p>"
                + "<p>You have successfully registered for the event: <b>" + event.getName() + "</b>.</p>"
                + "<p><b>Event Details:</b></p>"
                + "<ul>"
                + "<li><b>Event Name:</b> " + event.getName() + "</li>"
                + "<li><b>Date:</b> " + event.getDate() + "</li>"
                + "<li><b>Location:</b> " + event.getLocation() + "</li>"
                + "<li><b>Time:</b> " + event.getTime() + "</li>"
                + "</ul>"
                + "<p>Thank you for registering! We look forward to seeing you there.</p>"
                + "<p>Best Regards,</p>"
                + "<p><b>Team Eventify</b></p>"
                + "</body></html>";

        try {
            emailService.sendEmail(currentUser.getEmail(), subject, text);
        } catch (Exception e) {
            System.out.println(e);
        }


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
//        System.out.println("Hello");


        if (currentUser.getRegisteredEvents() == null) {
            return new UserRegisteredEventResponse(registered, attended, absent);
        }


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


        for (Event event : currentUser.getRegisteredEvents()) {
            event.getUserStatuses().stream()
                    .filter(userStatus -> userStatus.getUserId().getId().equals(currentUser.getId()))  // Filter by the current user
                    .findFirst()
                    .ifPresent(userStatus -> {
                        // Categorize the event based on the user's current status
                        String status = userStatus.getCurrentStatus();
                        LocalDate eventDate = LocalDate.parse(event.getDate(), formatter); // Parse event date
                        LocalDate today = LocalDate.now();

                        UserRegisteredEventResponse.Event eventResponse = new UserRegisteredEventResponse.Event()
                                .setId(event.getId())
                                .setName(event.getName())
                                .setDate(event.getDate())
                                .setTime(event.getTime())
                                .setLocation(event.getLocation())
                                .setImage(event.getCoverImage());

                        if (eventDate.isBefore(today)) {
                            if ("Present".equalsIgnoreCase(status)) {
                                eventResponse.setStatus("Attended");
                                attended.add(eventResponse);
                            } else {
                                eventResponse.setStatus("Absent");
                                absent.add(eventResponse);
                            }
                        } else {  // Event date is in the future or today
                            eventResponse.setStatus("Registered");
                            registered.add(eventResponse);
                        }
                    });

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
                                    .setCurrentStatus(Objects.equals(userStatus.getCurrentStatus(), "Present") ? "Present":"Absent")
                                    .setAttending("No")
                                    .setAttendanceCode(userStatus.getAttendanceCode())
                    ).toList();

        } else if (eventDate.after(todayDate)) {
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


    public MarkAttendanceResponse markAttendanceforEvent(String eventId, String userId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        User currentUser = userRepository.findById(userId).orElse(null);

        if (event == null || currentUser == null) {
            return new MarkAttendanceResponse().setCurrentStatus("Event or user not found");
        }

        List<UserStatus> userStatuses = event.getUserStatuses();

        if (userStatuses == null || userStatuses.isEmpty()) {
            return new MarkAttendanceResponse().setCurrentStatus("No user statuses found");
        }

        UserStatus matchingStatus = userStatusRepository.findByEventIdAndUserId(eventId, userId);

        if (matchingStatus == null) {
            return new MarkAttendanceResponse().setCurrentStatus("User not registered for this event");
        }

        if ("Present".equals(matchingStatus.getCurrentStatus())) {
            return new MarkAttendanceResponse().setCurrentStatus("User already marked as Present");
        }

        // Update the status to "Present"
        matchingStatus.setCurrentStatus("Present");

        // Save the updated UserStatus
        userStatusRepository.save(matchingStatus);

        // Return the updated status
        return new MarkAttendanceResponse().setCurrentStatus("Present");
    }

    public List<EventAttendanceQRResponse> getQRCodesforAttendance(User currentUser) {

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


    public List<UserAttendedEventsResponse> getAttendedEvents(User currentUser) {
        if (currentUser == null || currentUser.getId() == null) {
            return Collections.emptyList();
        }

        // Fetch all UserStatus entries for the given user where the status is "Present"
        List<UserStatus> userStatuses = userStatusRepository.findByUserIdAndCurrentStatus(
                currentUser.getId(),
                "Present"
        );

        // Map the results to the response DTO
        return userStatuses.stream()
                .map(userStatus -> {
                    Event event = userStatus.getEventId(); // Fetch the associated event
                    return new UserAttendedEventsResponse()
                            .setDate(event.getDate())
                            .setName(event.getName())
                            .setTime(event.getTime())
                            .setLocation(event.getLocation())
                            .setId(event.getId());
                })
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


    public List<EventAttendanceExportResponse.EventAttendanceData> getEventsWithAttendanceForUser(User currentUser) {
        if (currentUser == null || currentUser.getCreatedEvents() == null) {
            return Collections.emptyList();
        }

        return currentUser.getCreatedEvents().stream()
                .filter(event -> event != null && event.getUserStatuses() != null) // Filter out null events or userStatuses
                .map(event -> {
                    List<UserStatus> userStatuses = event.getUserStatuses();

                    List<EventAttendanceExportResponse.AttendanceUser> users = userStatuses.stream()
                            .filter(userStatus -> userStatus != null && userStatus.getUserId() != null) // Filter null UserStatus or UserId
                            .map(userStatus -> new EventAttendanceExportResponse.AttendanceUser()
                                    .setName(Optional.ofNullable(userStatus.getUserId().getName()).orElse("Unknown"))
                                    .setEmail(Optional.ofNullable(userStatus.getUserId().getEmail()).orElse("Unknown"))
                                    .setCurrentStatus(Optional.ofNullable(userStatus.getCurrentStatus()).orElse("Unknown"))
                                    .setAttendanceCode(Optional.ofNullable(userStatus.getAttendanceCode()).orElse("N/A"))
                                    .setRegisteredDate(Optional.ofNullable(userStatus.getRegisteredDate())
                                            .map(Object::toString)
                                            .orElse("Unknown")))
                            .toList();

                    return new EventAttendanceExportResponse.EventAttendanceData()
                            .setEventName(Optional.ofNullable(event.getName()).orElse("Untitled Event"))
                            .setUserStatuses(users);
                })
                .toList();
    }


    public EditEventDetailsResponse getEventDetailsForEdit(String eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }
        return new EditEventDetailsResponse()
                .setEventId(event.getId())
                .setEventTitle(Optional.ofNullable(event.getName()).orElse("Untitled Event"))
                .setEventDescription(Optional.ofNullable(event.getDescription()).orElse(""))
                .setEventDate(Optional.ofNullable(event.getDate()).orElse(""))
                .setEventTime(Optional.ofNullable(event.getTime()).orElse(""))
                .setEventLocation(Optional.ofNullable(event.getLocation()).orElse(""))
                .setEventCategory(Optional.ofNullable(event.getCategory()).orElse(""))
                .setRegistrationLimit(Optional.of(event.getMaxCapacity()).orElse(0))
                .setEventTags("")
                .setCoverImage(Optional.ofNullable(event.getCoverImage()).orElse(""))
                .setAgenda(
                        event.getAgenda() != null && !event.getAgenda().isEmpty()
                                ? event.getAgenda().stream()
                                .map(agendaItem -> new EditEventDetailsResponse.AgendaItem()
                                        .setAgendaItem(agendaItem.getDescription())
                                        .setStartTime(agendaItem.getTime()))
                                .collect(Collectors.toList())
                                : Collections.emptyList())
                .setSpeakers(
                        Optional.ofNullable(event.getSpeakers())
                                .map(speakers -> speakers.stream()
                                        .map(speaker -> new EditEventDetailsResponse.Speaker()
                                                .setName(speaker.getName())
                                                .setBio(speaker.getBio()))
                                        .collect(Collectors.toList()))
                                .orElse(Collections.emptyList()))
                .setAttendeeList(Optional.ofNullable(event.getAttendeeListPrivacy()).orElse(""));
    }


    public void updateEvent(String eventId, EditEventRequest
            eventDetailsRequest) throws Exception {

        // Fetch the existing event from the database
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new Exception("Event not found"));

        // Update event details
        event.setName(eventDetailsRequest.getEventTitle());
        event.setDescription(eventDetailsRequest.getEventDescription());
        event.setDate(eventDetailsRequest.getEventDate());
        event.setTime(eventDetailsRequest.getEventTime());
        event.setLocation(eventDetailsRequest.getEventLocation());
        event.setCategory(eventDetailsRequest.getEventCategory());
        event.setMaxCapacity(eventDetailsRequest.getRegistrationLimit());
        event.setCoverImage(eventDetailsRequest.getCoverImage());

        event.setAgenda(mapAgenda(eventDetailsRequest.getAgenda()));
        event.setSpeakers(mapSpeakers(eventDetailsRequest.getSpeakers()));
        event.setAttendeeListPrivacy(eventDetailsRequest.getAttendeeList());

        eventRepository.save(event);

        StringBuilder agendaBuilder = new StringBuilder();
        for (Event.AgendaItem agendaItem : event.getAgenda()) {
            agendaBuilder.append("<li><b>").append(agendaItem.getDescription()).append("</b> at ").append(agendaItem.getTime()).append("</li>");
        }

        // Format Speakers
        StringBuilder speakersBuilder = new StringBuilder();
        for (Event.Speaker speaker : event.getSpeakers()) {
            speakersBuilder.append("<li><b>").append(speaker.getName()).append("</b> - ").append(speaker.getBio()).append("</li>");
        }

        String subject = "Event Updated: " + event.getName();
        String text = "<html><body>"
                + "<p>Dear Attendee,</p>"
                + "<p>We wanted to inform you that the details for the event <b>" + event.getName() + "</b> have been updated:</p>"
                + "<ul>"
                + "<li><b>Event Name:</b> " + event.getName() + "</li>"
                + "<li><b>Date:</b> " + event.getDate() + "</li>"
                + "<li><b>Location:</b> " + event.getLocation() + "</li>"
                + "<li><b>Time:</b> " + event.getTime() + "</li>"
                + "<li><b>Registration Limit:</b> " + event.getMaxCapacity() + "</li>"
                + "<li><b>Agenda:</b><ul>" + agendaBuilder.toString() + "</ul></li>"
                + "<li><b>Speakers:</b><ul>" + speakersBuilder.toString() + "</ul></li>"
                + "</ul>"
                + "<p>Please review the updated event details. We look forward to your participation!</p>"
                + "<p>Best Regards,</p>"
                + "<p><b>Team Eventify</b></p>"
                + "</body></html>";

        // Send the email to all registered users
        for (User user : event.getRegisteredUsers()) {
            emailService.sendEmail(user.getEmail(), subject, text);
        }


    }


    private List<Event.AgendaItem> mapAgenda(List<EditEventRequest.AgendaItemRequest> agendaRequest) {
        // Map the request agenda items to the event's agenda
        return agendaRequest.stream().map(item -> new Event.AgendaItem(item.getAgendaItem(), item.getStartTime())).collect(Collectors.toList());
    }

    private List<Event.Speaker> mapSpeakers(List<EditEventRequest.SpeakerRequest> speakerRequest) {
        // Map the request speakers to the event's speakers
        return speakerRequest.stream().map(item -> new Event.Speaker(item.getName(), item.getBio())).collect(Collectors.toList());
    }

    public List<UserCreatedEventsInfoResponse> getEventsByUser(User currentUser) {
        return eventRepository.findByCreatedBy(currentUser).stream()
                .map(event -> new UserCreatedEventsInfoResponse(event.getId(), event.getName()))
                .collect(Collectors.toList());
    }


    public EventDetailUserResponse getEventDetailForUser(String eventId, User currentUser) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }

        return new EventDetailUserResponse(
                new EventDetailResponse()
                        .setTitle(event.getName())
                        .setDescription(event.getDescription())
                        .setLocation(event.getLocation())
                        .setDate(event.getDate())
                        .setRegistrationLimit(event.getMaxCapacity())
                        .setFilledSeats(event.getNumberRegistered())
                        .setCategory(event.getCategory())
                        .setSpeakers(event.getSpeakers())
                        .setAgenda(event.getAgenda())
                ,
                checkIfRegistered(eventId, currentUser));
    }

    public EventAnalyticsPageResponse getEventAnalytics(String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        double averageRating = 0.0;
        long actualAttendance = 0;
        Map<String, Integer> feedbackCounts = new HashMap<>();
        feedbackCounts.put("1 star", 0);
        feedbackCounts.put("2 star", 0);
        feedbackCounts.put("3 star", 0);
        feedbackCounts.put("4 star", 0);
        feedbackCounts.put("5 star", 0);
        List<String> topFeedbacks = new ArrayList<>();

        List<Feedback> feedbacks = event.getFeedbacks();
        if (feedbacks != null && !feedbacks.isEmpty()) {
            averageRating = feedbacks.stream()
                    .mapToInt(Feedback::getOverallRating)
                    .average()
                    .orElse(0.0);

            feedbacks.forEach(feedback -> {
                String key = feedback.getOverallRating() + " star";
                feedbackCounts.put(key, feedbackCounts.getOrDefault(key, 0) + 1);
            });

            topFeedbacks = feedbacks.stream()
                    .map(Feedback::getComments)
                    .filter(Objects::nonNull) // Filter out null comments
                    .limit(5)
                    .collect(Collectors.toList());
        }

        List<UserStatus> userStatuses = userStatusRepository.findByEventId(eventId);
        if (userStatuses != null) {
            actualAttendance = userStatuses.stream()
                    .filter(userStatus -> "Present".equalsIgnoreCase(userStatus.getCurrentStatus()))
                    .count();
        }

        return new EventAnalyticsPageResponse()
                .setId(event.getId())
                .setName(event.getName())
                .setTotalRegistrations(event.getNumberRegistered())
                .setActualAttendance((int) actualAttendance)
                .setFeedbackRating(averageRating)
                .setTotalFeedbackCount(feedbacks != null ? feedbacks.size() : 0)
                .setFeedbackCounts(feedbackCounts)
                .setTopFeedbacks(topFeedbacks);
    }

    public EventFeedbackPageResponse getEventFeedbackPageData(String eventId) {
        try {
            // Fetch the event details from the database
            Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

            // Fetch feedbacks for the event
            List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);

            // Calculate feedback metrics
            EventFeedbackPageResponse.FeedbackMetrics metrics = calculateFeedbackMetrics(feedbacks);

            // Create EventDetails object
            EventFeedbackPageResponse.EventDetails eventDetails = new EventFeedbackPageResponse.EventDetails();
            eventDetails.setEventId(event.getId());
            eventDetails.setTitle(event.getName());
            eventDetails.setDescription(event.getDescription());
            eventDetails.setDate(event.getDate());
            eventDetails.setVenue(event.getLocation());

            // Create EventFeedbackPageResponse object
            EventFeedbackPageResponse eventFeedbackData = new EventFeedbackPageResponse();
            eventFeedbackData.setEventDetails(eventDetails);
            eventFeedbackData.setMetrics(metrics);
            List<EventFeedbackPageResponse.Feedback> feedbackResponseList = feedbacks.stream()
                    .map(feedback -> {
                        EventFeedbackPageResponse.Feedback feedbackDTO = new EventFeedbackPageResponse.Feedback();
                        feedbackDTO.setId(feedback.getId());
                        feedbackDTO.setName(feedback.getUserId() != null && feedback.getUserId().getUsername() != null
                                ? feedback.getUserId().getUsername()
                                : "Unknown User");

                        feedbackDTO.setFeedback(feedback.getComments() != null ? feedback.getComments() : "No feedback provided");
                        feedbackDTO.setRating(feedback.getOverallRating()); // Assuming rating will always be provided

                        return feedbackDTO;
                    })
                    .collect(Collectors.toList()); // Collect the mapped feedback into a list

            eventFeedbackData.setFeedbacks(feedbackResponseList);

            return eventFeedbackData;

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException("Failed to fetch event feedback data");
        }
    }

    private EventFeedbackPageResponse.FeedbackMetrics calculateFeedbackMetrics(List<Feedback> feedbacks) {
        EventFeedbackPageResponse.FeedbackMetrics metrics = new EventFeedbackPageResponse.FeedbackMetrics();
        if (feedbacks != null && !feedbacks.isEmpty()) {
            metrics.setTotalFeedbacks(feedbacks.size());

            // Calculate average rating
            double averageRating = feedbacks.stream()
                    .mapToInt(Feedback::getOverallRating)
                    .average()
                    .orElse(0.0);
            metrics.setAverageRating(averageRating);

            // Initialize feedback count map
            Map<String, Integer> feedbackCountMap = new HashMap<>();
            feedbackCountMap.put("1 star", 0);
            feedbackCountMap.put("2 star", 0);
            feedbackCountMap.put("3 star", 0);
            feedbackCountMap.put("4 star", 0);
            feedbackCountMap.put("5 star", 0);

            // Count feedback ratings
            feedbacks.forEach(feedback -> {
                String key = feedback.getOverallRating() + " star";
                feedbackCountMap.put(key, feedbackCountMap.getOrDefault(key, 0) + 1);
            });

            metrics.setFeedBackCount(feedbackCountMap);

            int totalFeedbackCount = feedbacks.size();
            int positiveFeedbacks = (int) feedbacks.stream().filter(feedback -> feedback.getOverallRating() >= 3).count();
            int negativeFeedbacks = totalFeedbackCount - positiveFeedbacks;

            double positiveFeedbackPercentage = totalFeedbackCount > 0
                    ? (positiveFeedbacks * 100.0) / totalFeedbackCount
                    : 0.0;

            double negativeFeedbackPercentage = totalFeedbackCount > 0
                    ? (negativeFeedbacks * 100.0) / totalFeedbackCount
                    : 0.0;

            metrics.setPositiveFeedback(positiveFeedbackPercentage);
            metrics.setNegativeFeedback(negativeFeedbackPercentage);
        } else {
            // Set default values if no feedback
            metrics.setTotalFeedbacks(0);
            metrics.setAverageRating(0.0);
            metrics.setPositiveFeedback(0);
            metrics.setNegativeFeedback(0);
            metrics.setFeedBackCount(null);
        }
        return metrics;
    }
}

