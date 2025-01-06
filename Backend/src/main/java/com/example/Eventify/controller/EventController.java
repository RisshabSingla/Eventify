package com.example.Eventify.controller;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.User;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.request.EditEventRequest;
import com.example.Eventify.response.*;
import com.example.Eventify.service.EventService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequestMapping("/events")
@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/create")
    public ResponseEntity<EventCreateResponse> createEvent(@RequestBody CreateEventRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            if (currentUser == null) {
                return ResponseEntity.badRequest().body(null);
            }

            if (!Objects.equals(currentUser.getRole(), "Admin")) {
                return ResponseEntity.badRequest().body(null);
            }

            EventCreateResponse response = eventService.createEvent(request, currentUser);
            if (response == null) {
                return ResponseEntity.badRequest().body(null);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exploreEvents")
    public ResponseEntity<List<ExploreEventsResponse>> exploreEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            List<ExploreEventsResponse> paginatedEvents = eventService.exploreEvents(page, size);
            return ResponseEntity.ok(paginatedEvents);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getMyCreatedEvents")
    public ResponseEntity<List<AdminEventListResponse>> getMyEvents() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            if (currentUser == null) {
                return ResponseEntity.badRequest().body(null);
            }

            List<AdminEventListResponse> response = currentUser.getCreatedEvents().stream()
                    .map(event -> new AdminEventListResponse(
                            event.getId(),
                            event.getName(),
                            event.getDescription(),
                            event.getDate()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getAllEvents")
    public ResponseEntity<List<AdminEventListResponse>> getAllEvents(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "40") int size) {
        List<AdminEventListResponse> response = eventService.getAllAdminEvents(page, size).stream()
                .map(event -> new AdminEventListResponse(
                        event.getId(),
                        event.getName(),
                        event.getDescription(),
                        event.getDate()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getOverallEventAnalytics")
    public ResponseEntity<AdminEventAnalyticsResponse> getOverallEventAnalytics() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.getOverallEventAnalytics(currentUser));
    }

    @GetMapping("/getOverallAttendanceAnalytics")
    public ResponseEntity<AdminEventAttendanceResponse> getOverallAttendanceAnalytics() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.getOverallAttendanceAnalytics(currentUser));
    }

    @GetMapping("/getOverallFeedbackAnalytics")
    public ResponseEntity<AdminEventFeedbackAnalyticsResponse> getOverallFeedbackAnalytics() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.getOverallFeedbackAnalytics(currentUser));
    }

    @GetMapping("/getRecentFeedbacks")
    public ResponseEntity<List<AdminEventRecentFeedbackResponse>> getRecentFeedbacks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(eventService.getRecentFeedbacks(currentUser));
    }

    @PostMapping("/register/{eventId}")
    public ResponseEntity<EventRegiserResponse> registerEvent(@PathVariable String eventId) throws MessagingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (Objects.equals(currentUser.getRole(), "Admin")) {
            return ResponseEntity.badRequest().body(new EventRegiserResponse("Admins cannot register for events", -1));
        }

        return ResponseEntity.ok(eventService.registerEvent(eventId, currentUser));
    }

    @PostMapping("/unregister/{eventId}")
    public ResponseEntity<EventRegiserResponse> unregisterEvent(@PathVariable String eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.unregisterEvent(eventId, currentUser));
    }

    @GetMapping("/getEventDetail/{eventId}")
    public ResponseEntity<EventDetailResponse> getEventDetail(@PathVariable String eventId) {
        return ResponseEntity.ok(eventService.getEventDetail(eventId));
    }

    @GetMapping("/CheckIfRegistered/{eventId}")
    public ResponseEntity<Boolean> checkIfRegistered(@PathVariable String eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.checkIfRegistered(eventId, currentUser));
    }

    @GetMapping("/getRegisteredEvents")
    public ResponseEntity<UserRegisteredEventResponse> getRegisteredEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(eventService.getRegisteredEvents(currentUser));
    }

    @GetMapping("/getEventAttendance/{eventId}")
    public ResponseEntity<EventAttendancePageAdminResponse> getEventAttendance(@PathVariable String eventId)
            throws ParseException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(eventService.getEventAttendancePageAdminData(eventId, currentUser));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/markAttendance/{eventId}/{userId}")
    public ResponseEntity<MarkAttendanceResponse> markAttendanceEvent(@PathVariable String eventId,
            @PathVariable String userId) {
        try {
            return ResponseEntity.ok(eventService.markAttendanceforEvent(eventId, userId));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getQRCodes")
    public ResponseEntity<List<EventAttendanceQRResponse>> getQRCodes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(eventService.getQRCodesforAttendance(currentUser));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getAttendedEvents")
    public ResponseEntity<List<UserAttendedEventsResponse>> getAttendedEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(eventService.getAttendedEvents(currentUser));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getEventDetailsFeedback/{eventId}")
    public ResponseEntity<UserFeedbackEventDetailsResponse> getEventDetailsFeedback(@PathVariable String eventId) {
        try {
            return ResponseEntity.ok(eventService.getEventDetailsFeedback(eventId));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{eventId}/edit")
    public ResponseEntity<EditEventDetailsResponse> getEventDetails(@PathVariable String eventId) {
        EditEventDetailsResponse eventEdit = eventService.getEventDetailsForEdit(eventId);
        return ResponseEntity.ok(eventEdit);
    }

    @PutMapping("/update/{eventId}")
    public ResponseEntity<?> updateEventDetails(
            @PathVariable String eventId,
            @RequestBody EditEventRequest eventDetailsRequest) {

        try {
            eventService.updateEvent(eventId, eventDetailsRequest);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Return 400 if error occurs
        }
    }

    @GetMapping("getEventNames")
    public ResponseEntity<List<UserCreatedEventsInfoResponse>> getEventNames() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.getEventsByUser(currentUser));
    }

    @GetMapping("getEventDetailForUser/{eventId}")
    public ResponseEntity<EventDetailUserResponse> getEventDetailforUser(@PathVariable String eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try {
            return ResponseEntity.ok(eventService.getEventDetailForUser(eventId, currentUser));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("getEventManagementDetails")
    public ResponseEntity<AdminEventManagementPageResponse> getEventManagementPageDetails(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<AdminEventListResponse> allEvents = eventService.getAllAdminEvents(page, size).stream()
                .map(event -> new AdminEventListResponse(
                        event.getId(),
                        event.getName(),
                        event.getDescription(),
                        event.getDate()))
                .sorted(Comparator.comparing(AdminEventListResponse::getDate))
                .toList();

        List<AdminEventListResponse> adminCreatedEvents = currentUser.getCreatedEvents().stream()
                .map(event -> new AdminEventListResponse(event.getId(), event.getName(), event.getDescription(),
                        event.getDate()))
                .sorted(Comparator.comparing(AdminEventListResponse::getDate))
                .toList();
        AdminEventManagementPageResponse response = new AdminEventManagementPageResponse(allEvents, adminCreatedEvents);

        return ResponseEntity.ok(response);
    }

    @GetMapping("getEventAnalyticsPageDetails")
    public ResponseEntity<AdminEventAnalyticsPageResponse> getEventAnalyticsPageDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<AdminEventListResponse> allEvents = currentUser.getCreatedEvents().stream()
                .map(event -> new AdminEventListResponse(event.getId(), event.getName(), event.getDescription(),
                        event.getDate()))
                .sorted(Comparator.comparing(AdminEventListResponse::getDate))
                .toList();

        AdminEventAnalyticsResponse metrics = eventService.getOverallEventAnalytics(currentUser);

        AdminEventAnalyticsPageResponse response = new AdminEventAnalyticsPageResponse(allEvents, metrics);
        return ResponseEntity.ok(response);
    }

    @GetMapping("getEventAttendancePageDetails")
    public ResponseEntity<AdminEventAttendancePageResponse> getEventAttendancePageDetails() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        List<AdminEventListResponse> events = currentUser.getCreatedEvents().stream()
                .map(event -> new AdminEventListResponse(event.getId(), event.getName(), event.getDescription(),
                        event.getDate()))
                .sorted(Comparator.comparing(AdminEventListResponse::getDate))
                .toList();

        AdminEventAttendanceResponse metrics = eventService.getOverallAttendanceAnalytics(currentUser);

        AdminEventAttendancePageResponse response = new AdminEventAttendancePageResponse(events, metrics);

        return ResponseEntity.ok(response);
    }

    @GetMapping("GetEventFeedbackPageDetails")
    public ResponseEntity<AdminEventFeedbackPageResponse> getEventFeedbackPageDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<AdminEventListResponse> response = currentUser.getCreatedEvents().stream()
                .sorted(Comparator.comparing(Event::getDate))
                .map(event -> new AdminEventListResponse(event.getId(), event.getName(), event.getDescription(),
                        event.getDate()))
                .toList();
        AdminEventFeedbackAnalyticsResponse metrics = eventService.getOverallFeedbackAnalytics(currentUser);

        List<AdminEventRecentFeedbackResponse> recentFeedbacks = eventService.getRecentFeedbacks(currentUser);
        AdminEventFeedbackPageResponse pageResponse = new AdminEventFeedbackPageResponse(response, recentFeedbacks,
                metrics);
        return ResponseEntity.ok(pageResponse);
    }

    @GetMapping("getEventAnalytics/{eventId}")
    public ResponseEntity<EventAnalyticsPageResponse> getEventAnalytics(@PathVariable String eventId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            // Call the service method to get event analytics
            EventAnalyticsPageResponse eventAnalytics = eventService.getEventAnalytics(eventId);
            return ResponseEntity.ok(eventAnalytics);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }


    @GetMapping("getEventFeedbackDetails/{eventId}")
    public ResponseEntity<EventFeedbackPageResponse> getEventFeedbackDetails(@PathVariable String eventId) {
        try {
            EventFeedbackPageResponse eventFeedbackData = eventService.getEventFeedbackPageData(eventId);
            return ResponseEntity.ok(eventFeedbackData);
        } catch (Exception e) {
            // Log the error and return a bad request with error message
            return ResponseEntity.badRequest()
                    .body(null);
        }
    }

    @GetMapping("getAdminReportsPageDetails")
    public ResponseEntity<AdminEventReportPageResponse> getAdminReportsPageDetails() {
        try {
            AdminEventReportPageResponse res  = eventService.getAdminReportsPageData();
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("getEventReportsPageDetails/{eventId}")
    public ResponseEntity<EventReportPageResponse> getEventReportsPageDetails(@PathVariable String eventId) {
        try{
            EventReportPageResponse res = eventService.getEventReportsPageData(eventId);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }
}
