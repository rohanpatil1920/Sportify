package com.project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.PaymentStatus;

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
public class BookingResponseDTO {
	private Long id;
	private LocalDateTime createdOn;
	private LocalDateTime updatedOn;
	private Long playerId;
	private Long courtId;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private BigDecimal totalPrice;
	private PaymentStatus paymentStatus;

}
