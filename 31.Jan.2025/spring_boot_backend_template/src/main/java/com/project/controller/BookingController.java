package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ApiResponse;
import com.project.dto.BookingRequestDTO;
import com.project.dto.BookingResponseDTO;
import com.project.service.BookingService;
import com.project.service.PlayerService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/booking")
public class BookingController {
	@Autowired
	private BookingService bookingService;
	@Autowired
	private PlayerService playerService;

	@PostMapping("/{playerId}/create")
	public ResponseEntity<ApiResponse> createBooking(@PathVariable Long playerId,
			@RequestBody @Valid BookingRequestDTO bookingRequestDTO) {
		return ResponseEntity.ok(bookingService.addBooking(bookingRequestDTO, playerId));
	}

	@GetMapping("/{playerId}/view")
	public ResponseEntity<List<BookingResponseDTO>> getPlayerBookings(@PathVariable Long playerId) {
		return ResponseEntity.ok(bookingService.getPlayerBookings(playerId));
	}

	@PutMapping("/{playerId}/update/{bookingId}")
	public ResponseEntity<ApiResponse> updateBooking(@PathVariable Long playerId, @PathVariable Long bookingId,
			@RequestBody @Valid BookingRequestDTO bookingRequestDTO) {
		return ResponseEntity.ok(bookingService.updateBooking(playerId, bookingId, bookingRequestDTO));
	}

	@DeleteMapping("/{playerId}/delete/{bookingId}")
	public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Long playerId, @PathVariable Long bookingId) {
		return ResponseEntity.ok(bookingService.deleteBooking(playerId, bookingId));
	}

}
