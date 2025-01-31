package com.project.service;

import java.util.List;

import com.project.dto.ApiResponse;
import com.project.dto.VenueRequestDTO;
import com.project.dto.VenueResponseDTO;

public interface VenueService {
	ApiResponse createVenue(Long ownerId, VenueRequestDTO venueDTO);

	ApiResponse updateVenue(Long ownerId, Long venueId, VenueRequestDTO venueDTO);

	ApiResponse deleteVenue(Long ownerId, Long venueId);

	List<VenueResponseDTO> getVenues(String locality, String sportName, boolean available);
}
