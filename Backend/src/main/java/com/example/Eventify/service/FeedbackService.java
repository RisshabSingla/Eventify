package com.example.Eventify.service;

import com.example.Eventify.model.Event;
import com.example.Eventify.model.Feedback;
import com.example.Eventify.model.User;
import com.example.Eventify.repository.EventRepository;
import com.example.Eventify.repository.FeedbackRepository;
import com.example.Eventify.repository.UserRepository;
import com.example.Eventify.request.GiveFeedbackRequest;
import com.example.Eventify.response.FeedbackSubmitResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class FeedbackService {


    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    public FeedbackSubmitResponse giveFeedback(String eventId, GiveFeedbackRequest feedbackRequest, User currentUser) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }

        Feedback newFeedback = new Feedback()
                .setUserId(currentUser)
                .setComments(feedbackRequest.getComments())
                .setOverallRating(feedbackRequest.getOverallRating())
                .setSpeakerRating(feedbackRequest.getSpeakerRating())
                .setVenueRating(feedbackRequest.getVenueRating())
                .setSuggestions(feedbackRequest.getSuggestions())
                .setEventId(event)
                .setCreatedDate(new Date());

        feedbackRepository.save(newFeedback);

        if(currentUser.getFeedbacksGiven() == null){
            currentUser.setFeedbacksGiven(new java.util.ArrayList<>());
        }
        currentUser.getFeedbacksGiven().add(newFeedback);

        userRepository.save(currentUser);

        if(event.getFeedbacks() == null){
            event.setFeedbacks(new java.util.ArrayList<>());
        }
        event.getFeedbacks().add(newFeedback);

        eventRepository.save(event);

        return new FeedbackSubmitResponse()
                .setComments(newFeedback.getComments())
                .setOverallRating(newFeedback.getOverallRating())
                .setSpeakerRating(newFeedback.getSpeakerRating())
                .setVenueRating(newFeedback.getVenueRating())
                .setSuggestions(newFeedback.getSuggestions())
                .setId(newFeedback.getId());
    }
}
