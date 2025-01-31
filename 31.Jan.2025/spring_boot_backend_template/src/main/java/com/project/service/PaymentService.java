package com.project.service;

import com.project.dto.ApiResponse;
import com.project.dto.PaymentRequestDTO;
import com.project.dto.PaymentResponseDTO;

public interface PaymentService {
	ApiResponse initiatePayment(Long playerId, Long bookingId, PaymentRequestDTO paymentRequestDTO);

	PaymentResponseDTO getPaymentDetails(Long playerId, Long paymentId);
}
