package com.project.service;

import java.util.List;
import java.util.Map;

import com.project.dto.ApiResponse;
import com.project.dto.CourtRequestDTO;
import com.project.dto.CourtResponseDTO;
import com.project.dto.SportRequestDTO;
import com.project.dto.SportResponseDTO;
import com.project.dto.VenueRequestDTO;
import com.project.dto.VenueResponseDTO;

public interface VenueService {
	ApiResponse createVenue(Long ownerId, VenueRequestDTO venueDTO);

	ApiResponse updateVenue(Long ownerId, Long venueId, String name, String description);

	ApiResponse deleteVenue(Long ownerId, Long venueId);

	List<VenueResponseDTO> getVenues(String locality, String sportName, boolean available);

	List<VenueResponseDTO> getVenuesFromLocality(String locality);

	List<CourtResponseDTO> getCourtsByVenue(Long venueId);

	ApiResponse deleteCourt(Long courtId);

	ApiResponse addCourt(Long ownerId, CourtRequestDTO courtDTO);

	ApiResponse updateCourt(Long ownerId, Long courtId, CourtRequestDTO courtDTO);

	List<SportResponseDTO> getAllSports();

	ApiResponse deleteSport(Long sportId);

	ApiResponse updateSport(Long sportId, SportRequestDTO sportDTO);

	ApiResponse createSport(SportRequestDTO sportDTO);

	List<VenueResponseDTO> getAllVenues();

	List<VenueResponseDTO> getVenuesByOwner(Long ownerId);

	List<CourtResponseDTO> getCourtsByOwner(Long ownerId);

//	List<PlayerResponseDTO> getPlayersByOwner(Long ownerId)

	Map<String, String> getVenueDetails(Long venueId);

	CourtResponseDTO getCourtById(Long courtId);

	List<VenueResponseDTO> getVenuesBySport(String sportName);
}