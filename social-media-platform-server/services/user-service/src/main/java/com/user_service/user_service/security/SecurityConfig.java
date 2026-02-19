package com.user_service.user_service.security;

import com.user_service.user_service.service.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * A separate, higher-priority filter chain specifically for /files/**
     * This chain permits ALL requests and has NO JWT filter.
     * This completely bypasses any authentication for static file serving.
     */
    @Bean
    @Order(1)
    public SecurityFilterChain staticResourcesFilterChain(HttpSecurity http) throws Exception {
        System.out.println("🔧 Configuring Static Resources Security Filter Chain (Order 1)...");

        http
                .securityMatcher("/files/**")
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        System.out.println("✅ Static Resources Filter Chain configured - /files/** fully open");
        return http.build();
    }

    /**
     * The main filter chain for API requests (lower priority).
     */
    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("🔧 Configuring API Security Filter Chain (Order 2)...");

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    auth
                            .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                            .requestMatchers("/api/users/test/**").permitAll()
                            .requestMatchers("/api/users/internal/**").permitAll()
                            .requestMatchers("/actuator/**").permitAll()
                            .requestMatchers("/error").permitAll()
                            .anyRequest().authenticated();
                })
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        System.out.println("✅ API Security Filter Chain configured successfully");
        return http.build();
    }
}