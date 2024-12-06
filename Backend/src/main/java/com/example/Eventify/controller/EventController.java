package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.EventCreateResponse;
import com.example.Eventify.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

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
//        System.out.println(currentUser.toString());
        if(!Objects.equals(currentUser.getRole(), "Admin")) {
            return ResponseEntity.badRequest().body("Only admins can create events");
        }

        EventCreateResponse response = eventService.createEvent(request, currentUser);
//        System.out.println(response);
        return ResponseEntity.ok(response);
    }


}
