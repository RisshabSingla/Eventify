package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.*;
import com.example.Eventify.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequestMapping("/events")
@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@RequestBody CreateEventRequest request) {
        System.out.println(request);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        if(!Objects.equals(currentUser.getRole(), "Admin")) {
            return ResponseEntity.badRequest().body("Only admins can create events");
        }

        EventCreateResponse response = eventService.createEvent(request, currentUser);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getMyCreatedEvents")
    public ResponseEntity<List<AdminEventListResponse>> getMyEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        List<AdminEventListResponse> response = currentUser.getCreatedEvents().stream()
                .map(event -> new AdminEventListResponse(event.getId(), event.getName(), event.getDescription(), event.getDate()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/getAllEvents")
    public ResponseEntity<List<AdminEventListResponse>> getAllEvents() {
        List<AdminEventListResponse> response = eventService.getAllAdminEvents().stream()
                .map(event -> new AdminEventListResponse(event.getId(), event.getName(), event.getDescription(), event.getDate()))
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
    public ResponseEntity<AdminEventAttendanceResponse  > getOverallAttendanceAnalytics() {
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
    public ResponseEntity<EventRegiserResponse> registerEvent(@PathVariable String eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if(Objects.equals(currentUser.getRole(), "Admin")) {
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
    public ResponseEntity<EventAttendancePageAdminResponse> getEventAttendance(@PathVariable String eventId) throws ParseException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try{
            return ResponseEntity.ok(eventService.getEventAttendancePageAdminData(eventId, currentUser));
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PostMapping("/markAttendance/{eventId}/{userId}")
    public ResponseEntity<MarkAttendanceResponse> markAttendanceEvent(@PathVariable String eventId, @PathVariable String userId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if(!Objects.equals(currentUser.getRole(), "Admin")){
            return ResponseEntity.badRequest().body(null);
        }

        try{
            return ResponseEntity.ok(eventService.markAttendanceforEvent(eventId, userId));
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }

    }


}
