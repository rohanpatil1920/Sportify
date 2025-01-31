package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ApiResponse;
import com.project.dto.VenueRequestDTO;
import com.project.dto.VenueResponseDTO;
import com.project.service.VenueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/venue")
public class VenueController {

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
			@RequestBody @Valid VenueRequestDTO venueDTO) {
		return ResponseEntity.ok(venueService.updateVenue(ownerId, venueId, venueDTO));
	}

	@GetMapping("/{locality}/{sportName}/")
	public ResponseEntity<List<VenueResponseDTO>> getVenues(@PathVariable String locality,
			@PathVariable String sportName, boolean available) {
		return ResponseEntity.ok(venueService.getVenues(locality, sportName, available));
	}

	@DeleteMapping("/{ownerId}/delete/{venueId}")
	public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Long ownerId, @PathVariable Long venueId) {
		return ResponseEntity.ok(venueService.deleteVenue(ownerId, venueId));
	}

}
