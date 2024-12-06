package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AdminNotificationsResponse {
    private  String type;
    private String description;
    private Date timestamp;
    private String eventId;
}
