package com.api_gateway.api_gateway.config;

import com.api_gateway.api_gateway.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeExchange(exchange -> exchange
                        // ✅ Allow all OPTIONS requests (preflight)
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Public endpoints
                        .pathMatchers(
                                "/api/users/register",
                                "/api/users/login",
                                "/api/admin/auth/login",
                                "/health",
                                "/actuator/**",
                                "/fallback/**",
                                "/uploads/**"
                        ).permitAll()
                        // All other endpoints require authentication
                        .anyExchange().authenticated()
                )
                .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }
}