package com.project.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.ApiException;
import com.project.custom_exception.AuthenticationException;
import com.project.dto.ApiResponse;
import com.project.dto.UserLoginRequestDTO;
import com.project.dto.UserRegistrationRequestDTO;
import com.project.dto.UserResponseDTO;
import com.project.pojos.Admin;
import com.project.pojos.FacilityOwner;
import com.project.pojos.Player;
import com.project.pojos.User;
import com.project.pojos.UserRole;
import com.project.repository.AdminRepository;
import com.project.repository.FacilityOwnerRepository;
import com.project.repository.PlayerRepository;
import com.project.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private FacilityOwnerRepository facilityOwnerRepository;

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private ModelMapper modelMapper;

//	@Autowired
//	private PasswordEncoder passwordEncoder;

	@Override
	public UserResponseDTO userSignIn(UserLoginRequestDTO dto) {
		User user = userRepository.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password"));

		Player player = playerRepository.findById(user.getId())
				.orElseThrow(() -> new AuthenticationException("User not found"));

		return modelMapper.map(player, UserResponseDTO.class);
	}

	@Override
	public ApiResponse playerRegistration(UserRegistrationRequestDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists");

//		dto.setRole(UserRole.PLAYER);
		Player player = modelMapper.map(dto, Player.class);
//		player.setPassword(passwordEncoder.encode(dto.getPassword()));
		player.setRole(UserRole.PLAYER);
		player.setPassword(dto.getPassword());
		player.setIsActive(true);
		Player savedPlayer = playerRepository.save(player);

		return new ApiResponse("Player registered with ID " + savedPlayer.getId());
	}

	@Override
	public ApiResponse facilityOwnerRegistration(UserRegistrationRequestDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists");

		FacilityOwner facilityOwner = modelMapper.map(dto, FacilityOwner.class);
//		facilityOwner.setPassword(passwordEncoder.encode(dto.getPassword()));
		facilityOwner.setRole(UserRole.FACILITYOWNER);
		facilityOwner.setPassword(dto.getPassword());
		facilityOwner.setIsActive(true);
		FacilityOwner savedFacilityOwner = facilityOwnerRepository.save(facilityOwner);

		return new ApiResponse("Facility Owner registered with ID " + savedFacilityOwner.getId());

	}

	@Override
	public ApiResponse adminRegistration(UserRegistrationRequestDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists");

		Admin admin = modelMapper.map(dto, Admin.class);
//		admin.setPassword(passwordEncoder.encode(dto.getPassword()));
		admin.setRole(UserRole.ADMIN);
		admin.setPassword(dto.getPassword());
		admin.setIsActive(true);
		Admin savedAdmin = adminRepository.save(admin);

		return new ApiResponse("Facility Owner registered with ID " + savedAdmin.getId());
	}

}
