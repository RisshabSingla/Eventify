package com.example.Eventify.repository;

import com.example.Eventify.model.UserStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserStatusRepository extends MongoRepository<UserStatus, String> {
}
