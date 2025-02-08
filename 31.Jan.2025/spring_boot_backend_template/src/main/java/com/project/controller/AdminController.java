package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.custom_exception.AdminNotFoundException;
import com.project.dto.AdminDto;
import com.project.dto.ApiResponse;
import com.project.dto.DeletionRequestDTO;
import com.project.dto.UserDTO;
import com.project.service.AdminService;

@RestController
@RequestMapping("/admins")
@Validated
public class AdminController {

	@Autowired
	private AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	@GetMapping("/{id}")
	public ResponseEntity<AdminDto> getAdminById(@PathVariable Long id) {
		try {
			AdminDto adminDto = adminService.getAdminById(id);
			return new ResponseEntity<>(adminDto, HttpStatus.OK);
		} catch (AdminNotFoundException ex) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/players")
	public ResponseEntity<List<UserDTO>> getAllPlayers() {
		List<UserDTO> players = adminService.getAllPlayers(); // Call the service method to get all players
		return new ResponseEntity<>(players, HttpStatus.OK);
	}

	@GetMapping("/facility-owners")
	public ResponseEntity<List<UserDTO>> getAllFacilityOwners() {
		List<UserDTO> facilityOwners = adminService.getAllFacilityOwners(); // Call the service method to get
																			// all facility owners
		return new ResponseEntity<>(facilityOwners, HttpStatus.OK);
	}

	@GetMapping("/deletion-requests")
	public ResponseEntity<List<DeletionRequestDTO>> getPendingDeletionRequests() {
		return ResponseEntity.ok(adminService.getPendingDeletionRequests());
	}

	@PostMapping("/{adminId}/process-deletion/{requestId}")
	public ResponseEntity<ApiResponse> processDeletionRequest(@PathVariable Long adminId, @PathVariable Long requestId,
			@RequestParam boolean approve) {
		return ResponseEntity.ok(adminService.processDeletionRequest(adminId, requestId, approve));
	}
}
