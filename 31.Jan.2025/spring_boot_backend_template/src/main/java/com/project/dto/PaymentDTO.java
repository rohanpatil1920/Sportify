package com.project.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.PaymentMethod;
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
public class PaymentDTO extends SuperDTO {
//	private BigDecimal amount;
	private String bookingUniqueId;
	private String paymentId;
	private PaymentMethod paymentMethod;
	private LocalDateTime paymentTime;
	private PaymentStatus status;
	private String bookingStatus;
}
