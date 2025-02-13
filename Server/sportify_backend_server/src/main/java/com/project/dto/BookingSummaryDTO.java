package com.project.dto;

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
public class BookingSummaryDTO {

	private Long playerId; // ID of the player
	private String playerUsername; // Username of the player
	private Long courtId; // ID of the court
	private String date; // Booking date in string format

	// Constructor to map Booking entity to DTO
	public BookingSummaryDTO(Booking booking) {
		this.playerId = booking.getPlayer().getId();
		this.playerUsername = booking.getPlayer().getUsername(); // Assuming Player entity has a 'username' field
		this.courtId = booking.getCourt().getId();
		this.date = booking.getBookingDate().toString(); // Convert LocalDate to string
	}
}
