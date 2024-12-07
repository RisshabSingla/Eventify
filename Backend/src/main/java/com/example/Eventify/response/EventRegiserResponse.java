package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class EventRegiserResponse {
    private String status;
    private int registeredUsers;
}
