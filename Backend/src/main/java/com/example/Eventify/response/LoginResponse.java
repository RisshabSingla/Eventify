package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class LoginResponse {
    private String token;
    private String role;
    private long expiresIn;

    // Getters and setters...
}