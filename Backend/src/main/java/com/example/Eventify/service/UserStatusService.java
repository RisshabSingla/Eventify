package com.example.Eventify.service;

import com.example.Eventify.model.UserStatus;
import com.example.Eventify.repository.UserStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserStatusService {

    @Autowired
    UserStatusRepository userStatusRepository;

    public List<UserStatus> findUserStatusByEventId(String eventId) {

        return userStatusRepository.findByEventId(eventId);
    }
}
