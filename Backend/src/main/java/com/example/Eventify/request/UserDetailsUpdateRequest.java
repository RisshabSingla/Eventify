package com.example.Eventify.request;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class UserDetailsUpdateRequest {
    private String userName;
    private String phoneNumber;
    private String userImageUrl;
}
