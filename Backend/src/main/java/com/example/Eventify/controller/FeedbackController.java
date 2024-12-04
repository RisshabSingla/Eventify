package com.example.Eventify.controller;

import com.example.Eventify.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {

    @Autowired
    FeedbackRepository feedbackRepository;
}
