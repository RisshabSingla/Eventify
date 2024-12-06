package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.request.CreateEventRequest;
import com.example.Eventify.response.EventCreateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public EventCreateResponse createEvent(CreateEventRequest request, User currentUser) {
        // Build the Event object using chaining
        Event event = new Event()
                .setName(request.getName())
                .setDescription(request.getDescription())
                .setLocation(request.getLocation())
                .setDate(request.getDate())
                .setTime(request.getTime())
                .setMaxCapacity(request.getMaxCapacity())
                .setCategory(request.getCategory())
                .setCoverImage(request.getCoverImage())
                .setSpeakers(request.getSpeakers())
                .setAgenda(request.getAgenda())
                .setAttendeeListPrivacy(request.getAttendeeListPrivacy())
                .setCreatedBy(currentUser);

        // Save the event to the repository
        Event savedEvent = eventRepository.save(event);

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
}
