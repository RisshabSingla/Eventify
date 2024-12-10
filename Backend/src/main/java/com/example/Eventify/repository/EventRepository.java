package com.example.Eventify.repository;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByCreatedBy(User user);
}
