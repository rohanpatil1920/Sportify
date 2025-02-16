package com.project.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.ApiException;
import com.project.dto.AddressDTO;
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

import lombok.extern.slf4j.Slf4j;

@Slf4j
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

	@Autowired
	private BookingService bookingService;

	@Override
	public ApiResponse createVenue(Long ownerId, VenueRequestDTO venueDTO) {
		FacilityOwner owner = facilityOwnerRepository.findById(ownerId)
				.orElseThrow(() -> new ApiException("Facility Owner not found"));

		AddressDTO addressDTO = venueDTO.getAddress();

//		Address address = modelMapper.map(addressDTO, Address.class);

		Address address = new Address();
		address.setAdrLine1(addressDTO.getAdrLine1());
		address.setAdrLine2(addressDTO.getAdrLine2());
		address.setCity(addressDTO.getCity());
		address.setCountry(addressDTO.getCountry());
		address.setState(addressDTO.getState());
		address.setZipCode(addressDTO.getZipCode());

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
		System.out.println("Fetching courts for venueId: " + venueId);
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

	@Override
	public List<VenueResponseDTO> getAllVenues() {
		return venueRepository.findAll().stream().map(venue -> modelMapper.map(venue, VenueResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<VenueResponseDTO> getVenuesByOwner(Long ownerId) {
		FacilityOwner owner = facilityOwnerRepository.findById(ownerId)
				.orElseThrow(() -> new ApiException("Facility Owner not found"));

		return venueRepository.findByFacilityOwner(owner).stream()
				.map(venue -> modelMapper.map(venue, VenueResponseDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<CourtResponseDTO> getCourtsByOwner(Long ownerId) {
		FacilityOwner owner = facilityOwnerRepository.findById(ownerId)
				.orElseThrow(() -> new ApiException("Facility Owner not found"));
		return venueRepository.findByFacilityOwner(owner).stream().flatMap(venue -> venue.getCourts().stream())
				.map(court -> modelMapper.map(court, CourtResponseDTO.class)).collect(Collectors.toList());
	}

	@Override
	public Map<String, String> getVenueDetails(Long venueId) {
		Venue venue = venueRepository.findById(venueId)
				.orElseThrow(() -> new ApiException("Venue not found with id: " + venueId));

		Map<String, String> venueDetails = new HashMap<>();
		venueDetails.put("name", venue.getName());
		venueDetails.put("description", venue.getDescription());

		return venueDetails;
	}

	@Override
	public CourtResponseDTO getCourtById(Long courtId) {
		Court court = courtRepository.findById(courtId)
				.orElseThrow(() -> new ApiException("Court not found with ID: " + courtId));

		SportResponseDTO sport = new SportResponseDTO(court.getSport().getSportName(),
				court.getSport().getEquipmentChoice());

		AddressDTO address = new AddressDTO(court.getVenue().getVenueAddress().getAdrLine1(),
				court.getVenue().getVenueAddress().getAdrLine2(), court.getVenue().getVenueAddress().getCity(),
				court.getVenue().getVenueAddress().getState(), court.getVenue().getVenueAddress().getCountry(),
				court.getVenue().getVenueAddress().getZipCode());

		VenueResponseDTO venue = new VenueResponseDTO(court.getVenue().getId(), court.getVenue().getName(),
				court.getVenue().getDescription(), court.getVenue().getLocality(), address,
				court.getVenue().getFacilityOwner().getId());

		return new CourtResponseDTO(court.getPricePerHour(), sport, venue);

	}

	@Override
	public List<VenueResponseDTO> getVenuesBySport(String sportName) {
		return venueRepository.findAll().stream()
				.filter(venue -> venue.getCourts().stream()
						.anyMatch(court -> court.getSport().getSportName().name().equalsIgnoreCase(sportName)))
				.map(venue -> modelMapper.map(venue, VenueResponseDTO.class)).collect(Collectors.toList());
	}

//	@Override
//	public Venue getVenueDetails(Long venueId) {
//        return venueRepository.findById(venueId)
//                .orElseThrow(() -> new ApiException("Venue not found with id: " + venueId));
//    }

}
