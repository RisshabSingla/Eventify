package com.example.Eventify.response;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class RegisterResponse {
    private String id;
    private String email;
    private String name;
    private String role;
}
