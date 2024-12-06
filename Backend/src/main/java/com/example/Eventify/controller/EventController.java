package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.AdminEventListResponse;
import com.example.Eventify.response.EventCreateResponse;
import com.example.Eventify.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
}
