package com.project.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@ToString(callSuper = true)
public class BookingRequestDTO {
	@NotNull(message = "Booking date is required")
	private LocalDate bookingDate;

	@NotNull(message = "Court ID is required")
	private Long court;

	@NotNull(message = "Start time is required")
	private LocalDateTime startTime;

	@NotNull(message = "End time is required")
	private LocalDateTime endTime;

	@NotNull(message = "Venue ID is required")
	private Long venueId;
}
