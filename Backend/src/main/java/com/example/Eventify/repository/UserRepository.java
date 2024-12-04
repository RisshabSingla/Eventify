package com.example.Eventify.repository;

import com.example.Eventify.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
