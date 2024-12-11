package com.example.Eventify.repository;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByCreatedBy(User user);

    Page<Event> findAll(Pageable pageable);

}
