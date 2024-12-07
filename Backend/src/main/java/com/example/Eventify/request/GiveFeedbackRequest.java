package com.example.Eventify.request;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class GiveFeedbackRequest {

    private  int overallRating;
    private  int venueRating;
    private  int speakerRating;
    private String comments;
    private String futureSuggestions;
}
