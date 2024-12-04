package com.example.Eventify.controller;

import com.example.Eventify.repository.UserStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserStatusController {

    @Autowired
    UserStatusRepository userStatusRepository;
}
