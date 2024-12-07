package com.example.Eventify.model;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;


@AllArgsConstructor
@Data
@Getter
@Setter
@Accessors(chain = true)
@Document(collection = "user_statuses")
public class UserStatus {

    @Id
    private String id;

    @DBRef
    private Event eventId;  // Reference to Event class

    @DBRef
    private User userId;  // Reference to User class

    private String currentStatus;  // (Registered, Present, Yet to come, Attended, Absent)

    private String attendanceCode;

    private Date registeredDate;


    public UserStatus() {
        this.attendanceCode = generateRandomAttendanceCode();
    }

    // Method to generate random 25-character attendance code
    private String generateRandomAttendanceCode() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 25);
    }

}

