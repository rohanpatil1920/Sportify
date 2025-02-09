package com.project.service;

import java.util.List;

import com.project.dto.ApiResponse;
import com.project.dto.BookingRequestDTO;
import com.project.dto.BookingResponseDTO;

public interface BookingService {
	ApiResponse addBooking(BookingRequestDTO dto, Long playerId);

	List<BookingResponseDTO> getPlayerBookings(Long playerId);

	ApiResponse updateBooking(Long playerId, Long bookingId, BookingRequestDTO bookingRequestDTO);

	ApiResponse deleteBooking(Long playerId, Long bookingId);
}
