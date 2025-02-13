package com.project.service;

import java.util.List;

import com.project.dto.ApiResponse;
import com.project.dto.BookingRequestDTO;
import com.project.dto.BookingResponseDTO;
import com.project.dto.PlayerBookingResponse;

public interface BookingService {
	ApiResponse addBooking(BookingRequestDTO dto, Long playerId);

	List<BookingResponseDTO> getPlayerBookings(Long playerId);

	ApiResponse updateBooking(Long playerId, Long bookingId, BookingRequestDTO bookingRequestDTO);

	ApiResponse deleteBooking(Long playerId, Long bookingId);

	List<BookingResponseDTO> getBookingsByFacilityOwner(Long facilityOwnerId);

	Long getTotalBookingsByFacilityOwner(Long facilityOwnerId);

	List<PlayerBookingResponse> getPlayersByFacilityOwnerId(Long facilityOwnerId);
}
