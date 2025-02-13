package com.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.AdminNotFoundException;
import com.project.custom_exception.ApiException;
import com.project.dto.AdminDto;
import com.project.dto.ApiResponse;
import com.project.dto.DeletionRequestDTO;
import com.project.dto.UserDTO;
import com.project.pojos.Admin;
import com.project.pojos.DeletionRequest;
import com.project.pojos.DeletionStatus;
import com.project.pojos.FacilityOwner;
import com.project.pojos.Player;
import com.project.pojos.User;
import com.project.repository.AdminRepository;
import com.project.repository.DeletionRequestRepository;
import com.project.repository.FacilityOwnerRepository;
import com.project.repository.PlayerRepository;
import com.project.repository.UserRepository;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private PlayerRepository playerRepository;
	@Autowired
	private FacilityOwnerRepository facilityOwnerRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private DeletionRequestRepository deletionRequestRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<UserDTO> getAllPlayers() {
		List<Player> players = playerRepository.findAll();
		return players.stream().map(player -> modelMapper.map(player, UserDTO.class)) // =>Convert to DTO
				.collect(Collectors.toList());
	}

	@Override
	public List<UserDTO> getAllFacilityOwners() {
		List<FacilityOwner> owners = facilityOwnerRepository.findAll();
		return owners.stream().map(owner -> modelMapper.map(owner, UserDTO.class)) // =>Convert to DTO
				.collect(Collectors.toList());
	}

	@Override
	public AdminDto getAdminById(Long id) {
		Admin admin = adminRepository.findById(id)
				.orElseThrow(() -> new AdminNotFoundException("Admin not found with id " + id));
		return modelMapper.map(admin, AdminDto.class);
	}

	@Override
	public List<DeletionRequestDTO> getPendingDeletionRequests() {
		List<DeletionRequest> requests = deletionRequestRepository.findByStatus(DeletionStatus.PENDING);
		return requests.stream()
				.map(request -> new DeletionRequestDTO(request.getId(), request.getUser().getId(),
						request.getUser().getUsername(), request.getReason(), request.getUser().getEmail(),
						request.getUser().getRole()))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse processDeletionRequest(Long adminId, Long requestId, boolean approve) {
		Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ApiException("Admin not found"));

		DeletionRequest request = deletionRequestRepository.findById(requestId)
				.orElseThrow(() -> new ApiException("Deletion request not found"));

		if (approve) {
			User user = request.getUser();
			user.setIsActive(false);
			userRepository.save(user);

			request.setStatus(DeletionStatus.APPROVED);
			request.setApprovedBy(admin);
			request.setApprovedOn(LocalDateTime.now());
			deletionRequestRepository.save(request);
			return new ApiResponse("Deletion request approved successfully.");
		} else {
			request.setStatus(DeletionStatus.REJECTED);
			deletionRequestRepository.save(request);
			return new ApiResponse("Deletion request rejected.");
		}

	}

}
