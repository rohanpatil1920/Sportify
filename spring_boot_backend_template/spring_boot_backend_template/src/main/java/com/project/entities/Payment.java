package com.project.entities;

import java.beans.Transient;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "payment")
@ToString(callSuper = true, exclude = { "booking" })
@NoArgsConstructor
@Getter
@Setter

public class Payment extends SuperEntity {

	// Here also the same logic of Bookings is used to store the amount in the
	// database.
	@Column(name = "amount", nullable = false)
	private BigDecimal amount;

	@PostLoad // this annotation only runs after the entity has been loaded from the DB. To
				// avoid null pointer exceptions. source(StackOverflow)
	public void setAmountFromBooking() {
		if (this.booking != null) {
			this.amount = this.booking.getTotalPrice();
		}
	}

	@Column(name = "payment_id", unique = true)
	private String paymentId;

	@Column(name = "booking_unique_id", unique = true)
	private String bookingUniqueId;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentMethod paymentMethod;

	@Column(nullable = false, name = "payment_time")
	private LocalDateTime paymentTime;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentStatus status;

	// Instead of directly referencing the contact and email which would have been
	// redundant, I have used the getters which get the contact and email from the
	// booking which has the player information in them and made those two fields
	// transient to hide these fields and not make any column of them in the table.

	@Transient
	public String getEmail() {
		return booking.getPlayer().getEmail();
	}

	@Transient
	public String getContact() {
		return booking.getPlayer().getContact();
	}

	@Column(name = "booking_status")
	private String bookingStatus;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id", unique = true, nullable = false)
	private Booking booking;

	public Payment(String paymentId, String bookingUniqueId, PaymentMethod paymentMethod, LocalDateTime paymentTime,
			PaymentStatus status, String bookingStatus, Booking booking) {
		super();
		this.paymentId = paymentId;
		this.bookingUniqueId = bookingUniqueId;
		this.paymentMethod = paymentMethod;
		this.paymentTime = paymentTime;
		this.status = status;
		this.bookingStatus = bookingStatus;
		this.booking = booking;
	}

}