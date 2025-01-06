package com.example.Eventify.repository;

import com.example.Eventify.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByTypeAndTimeStampStartingWith(String type, String timestampPrefix);
    List<Notification> findTop10ByOrderByTimeStampDesc();

}
