package com.example.Eventify.response;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AdminEventListResponse {
    private String id;
    private String name;
    private String description;
    private String date;
}
