package com.project.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.pojos.Booking;
import com.project.pojos.Court;
import com.project.pojos.Player;
import com.project.pojos.Venue;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByPlayer(Player player);

	List<Booking> findByCourtAndBookingDate(Court court, LocalDate bookingDate);

	List<Booking> findByPlayerAndBookingDate(Player player, LocalDate bookingDate);

	Optional<Booking> findByIdAndPlayer(Long bookingId, Player player);

	boolean existsByCourtAndStartTimeLessThanAndEndTimeGreaterThan(Court court, LocalDateTime endTime,
			LocalDateTime startTime);

	boolean existsByPlayerAndBookingDate(Player player, LocalDate bookingDate);

	@Query("SELECT b FROM Booking b " + "JOIN b.court c " + "JOIN c.venue v " + "JOIN v.facilityOwner fo "
			+ "WHERE fo.id = :facilityOwnerId")
	List<Booking> findBookingsByFacilityOwnerId(@Param("facilityOwnerId") Long facilityOwnerId);

	List<Booking> findByCourtVenue(Venue venue);

	List<Booking> findByCourt_VenueIn(List<Venue> venues);

	@Query("SELECT COUNT(b) FROM Booking b WHERE b.court.venue.facilityOwner.id = :facilityOwnerId")
	Long countBookingsByFacilityOwnerId(@Param("facilityOwnerId") Long facilityOwnerId);

	@Query("SELECT b FROM Booking b WHERE b.court.venue.facilityOwner.id = :facilityOwnerId")
	List<Booking> findPlayersByFacilityOwnerId(@Param("facilityOwnerId") Long facilityOwnerId);

}
