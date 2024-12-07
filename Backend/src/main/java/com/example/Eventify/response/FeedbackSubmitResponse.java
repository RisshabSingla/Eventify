package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class FeedbackSubmitResponse {

    private String id;
    private  int overallRating;
    private  int venueRating;
    private  int speakerRating;
    private String comments;
    private String suggestions;
}
