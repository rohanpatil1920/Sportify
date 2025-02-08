package com.project.service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.ApiException;
import com.project.dto.ApiResponse;
import com.project.dto.CourtRequestDTO;
import com.project.dto.CourtResponseDTO;
import com.project.dto.SportRequestDTO;
import com.project.dto.SportResponseDTO;
import com.project.dto.VenueRequestDTO;
import com.project.dto.VenueResponseDTO;
import com.project.pojos.Address;
import com.project.pojos.Court;
import com.project.pojos.FacilityOwner;
import com.project.pojos.Sport;
import com.project.pojos.Venue;
import com.project.repository.AddressRepository;
import com.project.repository.CourtRepository;
import com.project.repository.FacilityOwnerRepository;
import com.project.repository.SportRepository;
import com.project.repository.VenueRepository;

@Service
@Transactional
public class VenueServiceImpl implements VenueService {

	@Autowired
	private VenueRepository venueRepository;

	@Autowired
	private FacilityOwnerRepository facilityOwnerRepository;

	@Autowired
	private CourtRepository courtRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private SportRepository sportRepository;

	@Override
	public ApiResponse createVenue(Long ownerId, VenueRequestDTO venueDTO) {
		FacilityOwner owner = facilityOwnerRepository.findById(ownerId)
				.orElseThrow(() -> new ApiException("Facility Owner not found"));

		Address address = venueDTO.getAddress();

		if (address != null) {
			addressRepository.save(address);
		}

		Venue venue = modelMapper.map(venueDTO, Venue.class);
		venue.setFacilityOwner(owner);
		venue.setVenueAddress(address);
		Venue savedVenue = venueRepository.save(venue);

		return new ApiResponse("Venue created successfully with ID: " + savedVenue.getId());
	}

	@Override
	public List<VenueResponseDTO> getVenues(String locality, String sportName, boolean available) {
		return venueRepository.findAll().stream().filter(v -> matchLocality(v, locality))
				.filter(v -> matchSports(v, sportName)).filter(v -> isAvailable(v, available))
				.map(v -> modelMapper.map(v, VenueResponseDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<VenueResponseDTO> getVenuesFromLocality(String locality) {
		return venueRepository.findAll().stream().filter(v -> matchLocality(v, locality))
				.map(v -> modelMapper.map(v, VenueResponseDTO.class)).collect(Collectors.toList());
	}

	private boolean isAvailable(Venue venue, boolean available) {
		return !available || venue.getCourts().stream().anyMatch(court -> court.getBookings().isEmpty());
	}

	private boolean matchSports(Venue venue, String sportName) {
		return sportName == null || venue.getCourts().stream()
				.anyMatch(court -> court.getSport().getSportName().name().equalsIgnoreCase(sportName));
	}

	private boolean matchLocality(Venue venue, String locality) {
		return locality == null || venue.getLocality().toString().equalsIgnoreCase(locality);
	}

	@Override
	public ApiResponse updateVenue(Long ownerId, Long venueId, String name, String description) {
		Venue venue = venueRepository.findById(venueId).orElseThrow(() -> new ApiException("Venue not found"));

		if (!venue.getFacilityOwner().getId().equals(ownerId)) {
			throw new ApiException("Unauthorized to update this venue");
		}

		venue.setName(name);
		venue.setDescription(description);
		venueRepository.save(venue);

		return new ApiResponse("Venue updated successfully.");
	}

	@Override
	public ApiResponse deleteVenue(Long ownerId, Long venueId) {
		Venue venue = venueRepository.findById(venueId).orElseThrow(() -> new ApiException("Venue not found"));

		if (!venue.getFacilityOwner().getId().equals(ownerId)) {
			throw new ApiException("Unauthorized to delete this venue");
		}

		venueRepository.delete(venue);
		return new ApiResponse("Venue deleted successfully.");
	}

	@Override
	public ApiResponse addCourt(Long ownerId, CourtRequestDTO courtDTO) {
		FacilityOwner owner = facilityOwnerRepository.findById(ownerId)
				.orElseThrow(() -> new ApiException("Facility Owner not found"));

		Venue venue = venueRepository.findById(courtDTO.getVenueId())
				.orElseThrow(() -> new ApiException("Venue not found"));

		if (!venue.getFacilityOwner().getId().equals(ownerId)) {
			throw new ApiException("Unauthorized action: Facility owner mismatch.");
		}

		Sport sport = sportRepository.findById(courtDTO.getSportId())
				.orElseThrow(() -> new ApiException("Sport not found"));

		Court court = new Court(courtDTO.getPricePerHour(), venue, sport);
		courtRepository.save(court);

		return new ApiResponse("Court created successfully with ID: " + court.getId());
	}

	@Override
	public ApiResponse updateCourt(Long ownerId, Long courtId, CourtRequestDTO courtDTO) {
		Court court = courtRepository.findById(courtId).orElseThrow(() -> new ApiException("Court not found"));

		if (!court.getVenue().getFacilityOwner().getId().equals(ownerId)) {
			throw new ApiException("Unauthorized action: Facility owner mismatch.");
		}

		Venue venue = venueRepository.findById(courtDTO.getVenueId())
				.orElseThrow(() -> new ApiException("Venue not found"));

		Sport sport = sportRepository.findById(courtDTO.getSportId())
				.orElseThrow(() -> new ApiException("Sport not found"));

		court.setPricePerHour(courtDTO.getPricePerHour());
		court.setVenue(venue);
		court.setSport(sport);
		courtRepository.save(court);

		return new ApiResponse("Court updated successfully.");
	}

	@Override
	public List<CourtResponseDTO> getCourtsByVenue(Long venueId) {
		Venue venue = venueRepository.findById(venueId).orElseThrow(() -> new ApiException("Venue not found"));

		return venue.getCourts().stream().map(court -> modelMapper.map(court, CourtResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteCourt(Long courtId) {
		Court court = courtRepository.findById(courtId).orElseThrow(() -> new ApiException("Court not found"));

		courtRepository.delete(court);

		return new ApiResponse("Court deleted successfully.");
	}

	@Override
	public ApiResponse createSport(SportRequestDTO sportDTO) {
		Sport sport = new Sport(sportDTO.isEquipmentChoice(), sportDTO.getSportName(), new HashSet<>());
		sportRepository.save(sport);
		return new ApiResponse("Sport created successfully with ID: " + sport.getId());
	}

	@Override
	public ApiResponse updateSport(Long sportId, SportRequestDTO sportDTO) {
		Sport sport = sportRepository.findById(sportId).orElseThrow(() -> new ApiException("Sport not found"));

		sport.setEquipmentChoice(sportDTO.isEquipmentChoice());
		sport.setSportName(sportDTO.getSportName());
		sportRepository.save(sport);

		return new ApiResponse("Sport updated successfully.");
	}

	@Override
	public ApiResponse deleteSport(Long sportId) {
		Sport sport = sportRepository.findById(sportId).orElseThrow(() -> new ApiException("Sport not found"));

		sportRepository.delete(sport);
		return new ApiResponse("Sport deleted successfully.");
	}

	@Override
	public List<SportResponseDTO> getAllSports() {
		return sportRepository.findAll().stream().map(sport -> modelMapper.map(sport, SportResponseDTO.class))
				.collect(Collectors.toList());
	}

}
