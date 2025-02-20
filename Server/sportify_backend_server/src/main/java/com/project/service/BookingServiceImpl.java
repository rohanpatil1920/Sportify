package com.project.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.ApiException;
import com.project.custom_exception.InvalidBookingException;
import com.project.dto.ApiResponse;
import com.project.dto.BookingRequestDTO;
import com.project.dto.BookingResponseDTO;
import com.project.dto.PlayerBookingResponse;
import com.project.pojos.Booking;
import com.project.pojos.Court;
import com.project.pojos.Player;
import com.project.pojos.Venue;
import com.project.repository.BookingRepository;
import com.project.repository.CourtRepository;
import com.project.repository.PlayerRepository;
import com.project.repository.VenueRepository;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private CourtRepository courtRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private VenueRepository VenueRepository;

	@Override
	public ApiResponse addBooking(BookingRequestDTO dto, Long playerId) {

		Player player = playerRepository.findById(playerId).orElseThrow(() -> new ApiException("Player not found"));

		Venue venue = VenueRepository.findById(dto.getVenueId()).orElseThrow(() -> new ApiException("Venue not found"));

		Court court = courtRepository.findById(dto.getCourt())
				.orElseThrow(() -> new ApiException("Court with give court ID not found!"));

		if (!court.getVenue().equals(venue)) {
			throw new ApiException("Court does not belong to the selected venue.");
		}

		if (dto.getStartTime().isBefore(LocalDateTime.now())) {
			throw new InvalidBookingException("Choose a future time slot!");
		}
		if (dto.getEndTime().isBefore(dto.getStartTime())) {
			throw new InvalidBookingException("The End time must be after the Start Time");
		}
		if (dto.getBookingDate().isBefore(LocalDate.now())) {
			throw new InvalidBookingException("The Booking must in the future!");
		}

		if (bookingRepository.existsByCourtAndStartTimeLessThanAndEndTimeGreaterThan(court, dto.getEndTime(),
				dto.getStartTime())) {
			throw new InvalidBookingException("Ovelapping Booking slots!");
		}
//		if (bookingRepository.existsByPlayerAndBookingDate(player, dto.getBookingDate())) {
//			throw new InvalidBookingException("Player already has a booking on this date.");
//		}

//		Booking booking = modelMapper.map(dto, Booking.class);
//		booking.calculateTotalPrice();

		Booking booking = new Booking();
		booking.setPlayer(player);
		booking.setCourt(court);
		booking.setBookingDate(dto.getBookingDate());
		booking.setStartTime(dto.getStartTime());
		booking.setEndTime(dto.getEndTime());

		booking.calculateTotalPrice();

		Booking savedBooking = bookingRepository.save(booking);

		return new ApiResponse("Booking created successfully with ID: " + savedBooking.getId());

	}

	@Override
	public List<BookingResponseDTO> getPlayerBookings(Long playerId) {
		Player player = playerRepository.findById(playerId).orElseThrow(() -> new ApiException("Player not found"));

		return bookingRepository.findByPlayer(player).stream().map(booking -> {
			// Manually map the additional fields
			BookingResponseDTO bookingResponseDTO = modelMapper.map(booking, BookingResponseDTO.class);
			bookingResponseDTO.setVenueName(booking.getCourt().getVenue().getName());
			bookingResponseDTO.setDate(booking.getStartTime().toLocalDate().toString());
			bookingResponseDTO.setTime(formatTimeRange(booking.getStartTime(), booking.getEndTime()));
			return bookingResponseDTO;
		}).collect(Collectors.toList());
	}

	private String formatTimeRange(LocalDateTime start, LocalDateTime end) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		return start.format(formatter) + " - " + end.format(formatter);
	}

	@Override
	public ApiResponse updateBooking(Long playerId, Long bookingId, BookingRequestDTO bookingRequestDTO) {
		Player player = playerRepository.findById(playerId).orElseThrow(() -> new ApiException("Player not found"));

		Booking booking = bookingRepository.findByIdAndPlayer(bookingId, player)
				.orElseThrow(() -> new ApiException("Booking not found"));

		Court court = courtRepository.findById(bookingRequestDTO.getCourt())
				.orElseThrow(() -> new ApiException("Court not found"));

		boolean flag = bookingRepository.findByCourtAndBookingDate(court, bookingRequestDTO.getBookingDate()).stream()
				.filter(e -> !e.getId().equals(bookingId))
				.noneMatch(e -> (bookingRequestDTO.getStartTime().isBefore(e.getEndTime())
						&& bookingRequestDTO.getEndTime().isAfter(e.getStartTime())));

		if (!flag) {
			throw new InvalidBookingException("Court is already booked for this time slot.");
		}

		booking.setCourt(court);
		booking.setBookingDate(bookingRequestDTO.getBookingDate());
		booking.setStartTime(bookingRequestDTO.getStartTime());
		booking.setEndTime(bookingRequestDTO.getEndTime());
		booking.calculateTotalPrice();
		bookingRepository.save(booking);

		return new ApiResponse("Booking updated successfully with ID: " + booking.getId());
	}

	@Override
	public ApiResponse deleteBooking(Long playerId, Long bookingId) {
		Booking booking = bookingRepository
				.findByIdAndPlayer(bookingId,
						playerRepository.findById(playerId).orElseThrow(() -> new ApiException("Player not found")))
				.orElseThrow(() -> new ApiException("Booking not found"));

		bookingRepository.delete(booking);
		return new ApiResponse("Booking deleted successfully.");
	}

	@Override
	public List<BookingResponseDTO> getBookingsByFacilityOwner(Long facilityOwnerId) {
		// Fetch bookings for all venues owned by the facility owner
		List<Booking> bookings = bookingRepository.findBookingsByFacilityOwnerId(facilityOwnerId);

		// Convert the list of Booking entities into BookingResponseDTOs
		return bookings.stream().map(booking -> {
			BookingResponseDTO bookingResponseDTO = modelMapper.map(booking, BookingResponseDTO.class);

			// Set additional details for the DTO
			bookingResponseDTO.setVenueName(booking.getCourt().getVenue().getName());
			bookingResponseDTO.setPlayerName(booking.getPlayer().getUsername());
			bookingResponseDTO.setDate(booking.getStartTime().toLocalDate().toString());
			bookingResponseDTO.setTime(formatTimeRange(booking.getStartTime(), booking.getEndTime()));
			return bookingResponseDTO;
		}).collect(Collectors.toList());
	}

	@Override
	public Long getTotalBookingsByFacilityOwner(Long facilityOwnerId) {
		return bookingRepository.countBookingsByFacilityOwnerId(facilityOwnerId);
	}

	@Override
	public List<PlayerBookingResponse> getPlayersByFacilityOwnerId(Long facilityOwnerId) {
		return bookingRepository.findPlayersByFacilityOwnerId(facilityOwnerId).stream()
				.map(booking -> new PlayerBookingResponse(booking.getPlayer().getUsername(),
						booking.getPlayer().getContact(), booking.getCourt().getId(), booking.getBookingDate()))
				.collect(Collectors.toList());
	}

}
