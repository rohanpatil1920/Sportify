package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.UserLoginRequestDTO;
import com.project.dto.UserRegistrationRequestDTO;
import com.project.service.PlayerService;
import com.project.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private PlayerService playerService;
	@Autowired
	private UserService userService;

	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody @Valid UserLoginRequestDTO dto) {
		System.out.println("Sign in request received" + dto);
		return ResponseEntity.ok(userService.userSignIn(dto));
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
