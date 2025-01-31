package com.project.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Booking;
import com.project.pojos.Court;
import com.project.pojos.Player;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByPlayer(Player player);

	List<Booking> findByCourtAndBookingDate(Court court, LocalDate bookingDate);

	List<Booking> findByPlayerAndBookingDate(Player player, LocalDate bookingDate);

	Optional<Booking> findByIdAndPlayer(Long bookingId, Player player);

	boolean existsByCourtAndStartTimeLessThanAndEndTimeGreaterThan(Court court, LocalDateTime endTime,
			LocalDateTime startTime);

	boolean existsByPlayerAndBookingDate(Player player, LocalDate bookingDate);

}
