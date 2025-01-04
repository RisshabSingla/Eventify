package com.example.Eventify.repository;

import com.example.Eventify.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {

    List<Feedback> findByEventId(String eventId);
}
