package com.project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.Booking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY) // Exclude null/empty fields in JSON responses
@ToString
public class BookingResponseDTO {

	private Long id; // Booking ID
	private LocalDateTime createdOn; // Timestamp when the booking was created
	private LocalDateTime updatedOn; // Timestamp when the booking was last updated
	private Long playerId; // ID of the player who made the booking
	private String playerName; // Player's name
	private Long courtId; // Court ID
	private Long venueId; // Venue ID
	private String venueName; // Venue name
	private String date; // Booking date in string format
	private String time; // Formatted time range (start - end)
	private BigDecimal totalPrice; // Total price of the booking

	// Constructor to map Booking entity to DTO
	public BookingResponseDTO(Booking booking) {
		this.id = booking.getId();
		this.createdOn = booking.getCreatedOn();
		this.updatedOn = booking.getUpdatedOn();
		this.playerId = booking.getPlayer().getId();
		this.playerName = booking.getPlayer().getUsername(); // Assuming Player entity has a 'username' field
		this.courtId = booking.getCourt().getId();
		this.venueId = booking.getCourt().getVenue().getId(); // Assuming Court has a Venue association
		this.venueName = booking.getCourt().getVenue().getName(); // Assuming Venue has a 'name' field
		this.date = booking.getBookingDate().toString();
		this.time = formatTimeRange(booking.getStartTime(), booking.getEndTime());
		this.totalPrice = booking.getTotalPrice();
	}

	// Helper method to format time range (e.g., 10:00 - 12:00)
	private String formatTimeRange(LocalDateTime start, LocalDateTime end) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		return start.format(formatter) + " - " + end.format(formatter);
	}
}
