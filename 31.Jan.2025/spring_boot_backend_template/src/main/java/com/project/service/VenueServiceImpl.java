package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.ApiException;
import com.project.dto.ApiResponse;
import com.project.dto.VenueRequestDTO;
import com.project.dto.VenueResponseDTO;
import com.project.pojos.FacilityOwner;
import com.project.pojos.Venue;
import com.project.repository.FacilityOwnerRepository;
import com.project.repository.VenueRepository;

@Service
@Transactional
public class VenueServiceImpl implements VenueService {

	@Autowired
	private VenueRepository venueRepository;

	@Autowired
	private FacilityOwnerRepository facilityOwnerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse createVenue(Long ownerId, VenueRequestDTO venueDTO) {
		FacilityOwner owner = facilityOwnerRepository.findById(ownerId)
				.orElseThrow(() -> new ApiException("Facility Owner not found"));

		Venue venue = modelMapper.map(venueDTO, Venue.class);
		venue.setFacilityOwner(owner);
		Venue savedVenue = venueRepository.save(venue);

		return new ApiResponse("Venue created successfully with ID: " + savedVenue.getId());
	}

	@Override
	public List<VenueResponseDTO> getVenues(String locality, String sportName, boolean available) {
		return venueRepository.findAll().stream().filter(v -> matchLocality(v, locality))
				.filter(v -> matchSports(v, sportName)).filter(v -> isAvailable(v, available))
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
	public ApiResponse updateVenue(Long ownerId, Long venueId, VenueRequestDTO venueDTO) {
		return null;
	}

	@Override
	public ApiResponse deleteVenue(Long ownerId, Long venueId) {
		return null;
	}

}
