package com.example.Eventify.config;


import com.example.Eventify.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Base64;


@Configuration
public class ApplicationConfiguration {
    private final UserRepository userRepository;

    public ApplicationConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Base64BCryptPasswordEncoder();
    }

    public static class Base64BCryptPasswordEncoder implements PasswordEncoder {

        private final BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

        @Override
        public String encode(CharSequence rawPassword) {
            String base64Encoded = Base64.getEncoder().encodeToString(rawPassword.toString().getBytes());
            return bcryptEncoder.encode(base64Encoded);
        }

        @Override
        public boolean matches(CharSequence rawPassword, String encodedPassword) {
            String base64Encoded = Base64.getEncoder().encodeToString(rawPassword.toString().getBytes());
            return bcryptEncoder.matches(base64Encoded, encodedPassword);
        }
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
