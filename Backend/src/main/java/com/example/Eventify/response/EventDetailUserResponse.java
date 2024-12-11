package com.example.Eventify.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class EventDetailUserResponse {

    private EventDetailResponse eventDetails;
    private Boolean isUserRegisteredForEvent;
}
