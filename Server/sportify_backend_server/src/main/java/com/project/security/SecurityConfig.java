package com.project.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JWTFilter jwtFilter;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http
				.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
		return authenticationManagerBuilder.build();
	}

	@Bean
	SecurityFilterChain authorizeRequest(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults()).authorizeHttpRequests(requests -> requests
				.requestMatchers("/authenticate", "/signin", "/signup/**", "venue/**", "/swagger-ui/**",
						"/v3/api-docs/**", "/swagger-resources/**", "/webjars/**", "/swagger-ui.html")
				.permitAll().requestMatchers("/players/**").hasAuthority("ROLE_PLAYER").requestMatchers("/owners/**")
				.hasAuthority("ROLE_FACILITYOWNER").requestMatchers("/admins/**").hasAuthority("ROLE_ADMIN")
				.requestMatchers("/users/**").hasAnyAuthority("ROLE_PLAYER", "ROLE_FACILITYOWNER", "ROLE_ADMIN")
				.anyRequest().authenticated()).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();
	}

}
