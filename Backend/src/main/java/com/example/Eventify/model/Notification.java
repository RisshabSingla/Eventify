package com.example.Eventify.model;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Accessors(chain = true)
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private String type;
    private String description;
    private Date timeStamp;

    @DBRef(lazy = true)
    private Event eventId;  // Reference to Event class

}

