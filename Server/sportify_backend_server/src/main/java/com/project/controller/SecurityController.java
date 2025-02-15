package com.project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.UserLoginRequestDTO;
import com.project.dto.UserRegistrationRequestDTO;
import com.project.dto.UserResponseDTO;
import com.project.security.JWTUtil;
import com.project.service.UserService;

import jakarta.validation.Valid;

@RestController
public class SecurityController {
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private UserService userService;

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody UserLoginRequestDTO cr) {
		// authenticate user with authentication manager
		Authentication auth = new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword());
		System.out.println("BEFORE AUTH: " + auth);
		auth = authManager.authenticate(auth);
		System.out.println("AFTER AUTH: " + auth);
		// after authentication, create JWT token and return.
		String token = jwtUtil.createToken(auth);
		System.out.println(token);
		return ResponseEntity.ok(token);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody @Valid UserLoginRequestDTO dto) {
		System.out.println("Sign in request received" + dto);
		UserResponseDTO userResponse = userService.userSignIn(dto);
		Authentication authentication = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		authentication = authManager.authenticate(authentication);
		String token = jwtUtil.createToken(authentication);
		return ResponseEntity.ok(Map.of("user", userResponse, "token", token));
	}

	@PostMapping("/signup/player")
	public ResponseEntity<?> playerRegistration(@RequestBody @Valid UserRegistrationRequestDTO dto) {
		System.out.println("Player registration request received" + dto);
		return ResponseEntity.ok(userService.playerRegistration(dto));
	}

	@PostMapping("/signup/facilityowner")
	public ResponseEntity<?> facilityOwnerRegistration(@RequestBody @Valid UserRegistrationRequestDTO dto) {
		System.out.println("Facility owner registration request received" + dto);
		return ResponseEntity.ok(userService.facilityOwnerRegistration(dto));
	}

	@PostMapping("/signup/admin")
	public ResponseEntity<?> adminRegistration(@RequestBody @Valid UserRegistrationRequestDTO dto) {
		System.out.println("Admin registration request received" + dto);
		return ResponseEntity.ok(userService.adminRegistration(dto));
	}

}
