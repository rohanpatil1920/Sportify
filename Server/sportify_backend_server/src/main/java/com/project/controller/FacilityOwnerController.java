package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ApiResponse;
import com.project.dto.CourtRequestDTO;
import com.project.dto.SportRequestDTO;
import com.project.dto.VenueRequestDTO;
import com.project.service.UserService;
import com.project.service.VenueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/owners")
@Validated
public class FacilityOwnerController {

	@Autowired
	private UserService userService;

	@Autowired
	private VenueService venueService;

	@PostMapping("/{ownerId}/register")
	public ResponseEntity<?> venueRegistration(@PathVariable Long ownerId,
			@RequestBody @Valid VenueRequestDTO venueDTO) {
		System.out.println("Venue Registration request received" + venueDTO);
		return ResponseEntity.ok(venueService.createVenue(ownerId, venueDTO));
	}

	@PutMapping("/{ownerId}/update/{venueId}")
	public ResponseEntity<ApiResponse> updateVenue(@PathVariable Long ownerId, @PathVariable Long venueId,
			@RequestParam @Valid String name, String description) {
		return ResponseEntity.ok(venueService.updateVenue(ownerId, venueId, name, description));
	}

	@DeleteMapping("/{ownerId}/delete/{venueId}")
	public ResponseEntity<ApiResponse> deletevenue(@PathVariable Long ownerId, @PathVariable Long venueId) {
		return ResponseEntity.ok(venueService.deleteVenue(ownerId, venueId));
	}

//	@PostMapping("/{ownerId}/courts/{venueId}/{sportId}")
	@PostMapping("/{ownerId}/courts")
	public ResponseEntity<ApiResponse> addCourt(@PathVariable Long ownerId,
			@RequestBody @Valid CourtRequestDTO courtDTO) {
		ApiResponse response = venueService.addCourt(ownerId, courtDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PutMapping("/courts/{courtId}/{ownerId}")
	public ResponseEntity<ApiResponse> updateCourt(@PathVariable Long courtId, @PathVariable Long ownerId,
			@RequestBody @Valid CourtRequestDTO courtDTO) {
		ApiResponse response = venueService.updateCourt(ownerId, courtId, courtDTO);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/courts/{courtId}")
	public ResponseEntity<ApiResponse> deleteCourt(@PathVariable Long courtId) {
		ApiResponse response = venueService.deleteCourt(courtId);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/sports")
	public ResponseEntity<ApiResponse> createSport(@RequestBody @Valid SportRequestDTO sportDTO) {
		return ResponseEntity.ok(venueService.createSport(sportDTO));
	}

	@PutMapping("/sports/{sportId}")
	public ResponseEntity<ApiResponse> updateSport(@PathVariable Long sportId,
			@RequestBody @Valid SportRequestDTO sportDTO) {
		return ResponseEntity.ok(venueService.updateSport(sportId, sportDTO));
	}

	@DeleteMapping("/sports/{sportId}")
	public ResponseEntity<ApiResponse> deleteSport(@PathVariable Long sportId) {
		return ResponseEntity.ok(venueService.deleteSport(sportId));
	}
}
