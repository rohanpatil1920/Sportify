package com.project.dto;

import java.time.LocalDate;

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
public class PlayerBookingSummaryDTO {

	private Long playerId; // ID of the player
	private String playerUsername; // Username of the player
	private Long courtId; // ID of the court
	private LocalDate bookingDate; // Booking date

	// Constructor to map from Booking entity
	public PlayerBookingSummaryDTO(Booking booking) {
		this.playerId = booking.getPlayer().getId();
		this.playerUsername = booking.getPlayer().getUsername(); // Assuming Player has a 'username' field
		this.courtId = booking.getCourt().getId();
		this.bookingDate = booking.getBookingDate();
	}
}
