package com.project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.Booking;
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
	private BigDecimal totalPrice;
	private PaymentStatus paymentStatus;
	private Long venueId;
	private String venueName;  
	private String date;     
	private String time;    

	// Constructor to convert Booking entity to DTO
	public BookingResponseDTO(Booking booking) {
        this.id = booking.getId();
        this.createdOn = booking.getCreatedOn();
        this.updatedOn = booking.getUpdatedOn();
        this.playerId = booking.getPlayer().getId();
        this.courtId = booking.getCourt().getId();
        this.totalPrice = booking.getTotalPrice();
        //this.paymentStatus = booking.getPaymentStatus();
        this.venueId = booking.getCourt().getVenue().getId();
        this.venueName = booking.getCourt().getVenue().getName(); 
        this.date = booking.getStartTime().toLocalDate().toString(); 
        this.time = formatTimeRange(booking.getStartTime(), booking.getEndTime()); 
    }

    // The method to format the time range
    private String formatTimeRange(LocalDateTime start, LocalDateTime end) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm"); 
        return start.format(formatter) + " - " + end.format(formatter); 
    }
}