package com.project.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class CourtRequestDTO {
	@NotNull(message = "Venue ID is required")
	private Long venueId;

	@NotNull(message = "Sport ID is required")
	private Long sportId;

	@NotNull(message = "Price is required")
	@DecimalMin(value = "0.0", inclusive = false)
	@Digits(integer = 6, fraction = 2)
	@Positive(message = "Price must be greater than 0")
	private BigDecimal pricePerHour;
}
