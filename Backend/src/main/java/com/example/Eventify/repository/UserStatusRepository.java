package com.example.Eventify.repository;

import com.example.Eventify.model.UserStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserStatusRepository extends MongoRepository<UserStatus, String> {

    Optional<UserStatus> findByUserIdAndEventId(String userId, String eventId);

    List<UserStatus> findByUserIdAndCurrentStatus(String userId, String currentStatus);

    List<UserStatus>findByEventId(String eventId);

    UserStatus findByEventIdAndUserId(String eventId, String userId);
}
