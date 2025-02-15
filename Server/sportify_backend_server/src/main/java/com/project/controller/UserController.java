package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ApiResponse;
import com.project.dto.UserAccountDeletionRequestDTO;
import com.project.dto.UserResponseDTO;
import com.project.dto.UserUpdationDTO;
import com.project.security.JWTUtil;
import com.project.service.AdminService;
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
	@Autowired
	private AdminService adminService;

	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JWTUtil jwtUtil;

	@PutMapping("/{userId}/update")
	public ResponseEntity<ApiResponse> updateUserProfile(@PathVariable Long userId,
			@RequestBody @Valid UserUpdationDTO userDTO) {
		return ResponseEntity.ok(userService.updateProfile(userId, userDTO));
	}

	@GetMapping("/{userId}/profile")
	public ResponseEntity<UserResponseDTO> getUserProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getProfile(userId));
	}

	@PostMapping("/{userId}/request-deletion")
	public ResponseEntity<ApiResponse> requestAccountDeletion(@PathVariable Long userId,
			@RequestBody @Valid UserAccountDeletionRequestDTO request) {
		return ResponseEntity.ok(userService.requestAccountDeletion(userId, request));
	}

//	@PostMapping("/authenticate")
//	public ResponseEntity<?> authenticate(@RequestBody UserLoginRequestDTO cr) {
//		// authenticate user with authentication manager
//		Authentication auth = new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword());
//		System.out.println("BEFORE AUTH: " + auth);
//		auth = authManager.authenticate(auth);
//		System.out.println("AFTER AUTH: " + auth);
//		// after authentication, create JWT token and return.
//		String token = jwtUtil.createToken(auth);
//		System.out.println(token);
//		return ResponseEntity.ok(token);
//	}

//	@PostMapping("/signin")
//	public ResponseEntity<?> signin(@RequestBody @Valid UserLoginRequestDTO dto) {
//		System.out.println("Sign in request received" + dto);
//		UserResponseDTO userResponse = userService.userSignIn(dto);
//		Authentication authentication = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
//		authentication = authManager.authenticate(authentication);
//		String token = jwtUtil.createToken(authentication);
//		return ResponseEntity.ok(Map.of("user", userResponse, "token", token));
//	}

//	@PostMapping("/signup/player")
//	public ResponseEntity<?> playerRegistration(@RequestBody @Valid UserRegistrationRequestDTO dto) {
//		System.out.println("Player registration request received" + dto);
//		return ResponseEntity.ok(userService.playerRegistration(dto));
//	}
//
//	@PostMapping("/signup/facilityowner")
//	public ResponseEntity<?> facilityOwnerRegistration(@RequestBody @Valid UserRegistrationRequestDTO dto) {
//		System.out.println("Facility owner registration request received" + dto);
//		return ResponseEntity.ok(userService.facilityOwnerRegistration(dto));
//	}
//
//	@PostMapping("/signup/admin")
//	public ResponseEntity<?> adminRegistration(@RequestBody @Valid UserRegistrationRequestDTO dto) {
//		System.out.println("Admin registration request received" + dto);
//		return ResponseEntity.ok(userService.adminRegistration(dto));
//	}

}
