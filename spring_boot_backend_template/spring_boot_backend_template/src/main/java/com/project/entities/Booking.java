package com.project.entities;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bookings")
@ToString(callSuper = true, exclude = { "player", "court" })
@NoArgsConstructor
@Getter
@Setter
public class Booking extends SuperEntity {

	// Added a column Total Price which was not added before as there was only a
	// getter for getting total price but it was transient.
	// Now the calculate total price is a method which will calculate it and then
	// total price will be stored in the DB.
	// This can be helpful when going through the database and for every time we
	// need the total price of a booking.

	@Column(name = "total_price", nullable = false)
	private BigDecimal totalPrice;

	@PrePersist // this I have used to calculate total price before persisting the entity in the
				// DB
	@PreUpdate // this I have used to calculate total price before updating the entity in the
				// DB
	// what the above two annotations will do is they will calculate total price
	// before the entity is created and the default values are set.
	// so the total price will be calculated only when a new booking is created or
	// an existing booking is updated not every time.
	// source(StackOverflow)

	public void calculateTotalPrice() {
		if (court != null && court.getPricePerHour() != null) {
			this.totalPrice = court.getPricePerHour()
					.multiply(BigDecimal.valueOf(Duration.between(startTime, endTime).toHours()));
		} else {
			this.totalPrice = BigDecimal.ZERO;
		}
	}

	@Column(nullable = false, name = "booking_date")
	private LocalDate bookingDate;

	@Column(nullable = false, name = "start_time")
	private LocalDateTime startTime;

	@Column(nullable = false, name = "end_time")
	private LocalDateTime endTime;

	@ManyToOne
	@JoinColumn(name = "court_id", nullable = false)
	private Court court;

	@ManyToOne
	@JoinColumn(name = "player_id", nullable = false)
	private Player player;

	public Booking(BigDecimal totalPrice, LocalDate bookingDate, LocalDateTime startTime, LocalDateTime endTime,
			Court court, Player player) {
		super();
		this.totalPrice = totalPrice;
		this.bookingDate = bookingDate;
		this.startTime = startTime;
		this.endTime = endTime;
		this.court = court;
		this.player = player;
	}

}
