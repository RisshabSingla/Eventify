package com.example.Eventify.model;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


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
    private String timeStamp;

    @DBRef
    private Event eventId;  // Reference to Event class

}

