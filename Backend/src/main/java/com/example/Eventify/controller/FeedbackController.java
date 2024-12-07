package com.example.Eventify.controller;

import com.example.Eventify.model.User;
import com.example.Eventify.repository.FeedbackRepository;
import com.example.Eventify.request.GiveFeedbackRequest;
import com.example.Eventify.response.FeedbackSubmitResponse;
import com.example.Eventify.response.UserGivenFeedbackResponse;
import com.example.Eventify.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/feedback")
@RestController
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @PostMapping("/giveFeedback/{eventId}")
    public ResponseEntity<FeedbackSubmitResponse> giveFeedback(@PathVariable String eventId, @RequestBody GiveFeedbackRequest feedbackRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try{
            return ResponseEntity.ok(feedbackService.giveFeedback(eventId, feedbackRequest, currentUser));
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }


    @GetMapping("/getFeedbacks")
    public ResponseEntity<List<UserGivenFeedbackResponse>> getFeedbacks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try{
            return ResponseEntity.ok(feedbackService.getFeedbacks(currentUser));
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }



}
