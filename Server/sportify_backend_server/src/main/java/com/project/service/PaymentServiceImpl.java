package com.project.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.ApiResponse;
import com.project.dto.PaymentRequestDTO;
import com.project.dto.PaymentResponseDTO;
import com.project.repository.BookingRepository;
import com.project.repository.PaymentRepository;
import com.project.repository.PlayerRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse initiatePayment(Long playerId, Long bookingId, PaymentRequestDTO paymentRequestDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PaymentResponseDTO getPaymentDetails(Long playerId, Long paymentId) {
		// TODO Auto-generated method stub
		return null;
	}

}
