package com.example.Eventify.request;


import lombok.*;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class LoginRequest {
    private String email;
    private String password;
}
