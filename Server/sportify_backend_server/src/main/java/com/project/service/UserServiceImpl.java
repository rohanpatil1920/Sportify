package com.project.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.ApiException;
import com.project.custom_exception.AuthenticationException;
import com.project.dto.ApiResponse;
import com.project.dto.UserAccountDeletionRequestDTO;
import com.project.dto.UserLoginRequestDTO;
import com.project.dto.UserRegistrationRequestDTO;
import com.project.dto.UserResponseDTO;
import com.project.dto.UserUpdationDTO;
import com.project.pojos.Admin;
import com.project.pojos.DeletionRequest;
import com.project.pojos.DeletionStatus;
import com.project.pojos.FacilityOwner;
import com.project.pojos.Player;
import com.project.pojos.User;
import com.project.pojos.UserRole;
import com.project.repository.AdminRepository;
import com.project.repository.DeletionRequestRepository;
import com.project.repository.FacilityOwnerRepository;
import com.project.repository.PlayerRepository;
import com.project.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private FacilityOwnerRepository facilityOwnerRepository;

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private DeletionRequestRepository deletionRequestRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserResponseDTO userSignIn(UserLoginRequestDTO dto) {

		User user = userRepository.findByEmail(dto.getEmail())
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password"));

		if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new AuthenticationException("Invalid Email or Password");
		}

		// update here: checking if the user is deleted or not 31 Jan night
		if (!user.getIsActive()) {
			throw new AuthenticationException("Account is deactivated. Please contact admin.");
		}
		log.info("Signing in user: {}", dto.getEmail());
		return modelMapper.map(user, UserResponseDTO.class);
	}

	@Override
	public ApiResponse playerRegistration(UserRegistrationRequestDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists");

//		dto.setRole(UserRole.PLAYER);
		Player player = modelMapper.map(dto, Player.class);
		player.setPassword(passwordEncoder.encode(dto.getPassword()));
		player.setRole(UserRole.PLAYER);
//		player.setPassword(dto.getPassword());
		player.setIsActive(true);
		Player savedPlayer = playerRepository.save(player);

		return new ApiResponse("Player registered with ID " + savedPlayer.getId());
	}

	@Override
	public ApiResponse facilityOwnerRegistration(UserRegistrationRequestDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists");

		FacilityOwner facilityOwner = modelMapper.map(dto, FacilityOwner.class);
		facilityOwner.setPassword(passwordEncoder.encode(dto.getPassword()));
		facilityOwner.setRole(UserRole.FACILITYOWNER);
//		facilityOwner.setPassword(dto.getPassword());
		facilityOwner.setIsActive(true);
		FacilityOwner savedFacilityOwner = facilityOwnerRepository.save(facilityOwner);

		return new ApiResponse("Facility Owner registered with ID " + savedFacilityOwner.getId());

	}

	@Override
	public ApiResponse adminRegistration(UserRegistrationRequestDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists");

		Admin admin = modelMapper.map(dto, Admin.class);
		admin.setPassword(passwordEncoder.encode(dto.getPassword()));
		admin.setRole(UserRole.ADMIN);
//		admin.setPassword(dto.getPassword());
		admin.setIsActive(true);
		Admin savedAdmin = adminRepository.save(admin);

		return new ApiResponse("Facility Owner registered with ID " + savedAdmin.getId());
	}

	// Updation of Profile changes and vieprofile for a user

	@Override
	public UserResponseDTO getProfile(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new ApiException("User not found"));
		return modelMapper.map(user, UserResponseDTO.class);
	}

	@Override
	public ApiResponse updateProfile(Long userId, UserUpdationDTO userDTO) {
		User user = userRepository.findById(userId).orElseThrow(() -> new ApiException("User not found"));

		// Here while updating the user must update the contact, email and username to
		// unique elements cause of the User entity restrictions that we have given so
		// just to be safe I have given this here cause later it will be painful to
		// resolve

		if (!user.getUsername().equals(userDTO.getUsername())
				&& userRepository.existsByUsername(userDTO.getUsername())) {
			throw new ApiException("Username already exists.");
		}

		if (!user.getEmail().equals(userDTO.getEmail()) && userRepository.existsByEmail(userDTO.getEmail())) {
			throw new ApiException("Email already exists.");
		}

		if (!user.getContact().equals(userDTO.getContact()) && userRepository.existsByContact(userDTO.getContact())) {
			throw new ApiException("Contact number already exists.");
		}

		user.setUsername(userDTO.getUsername());
		user.setEmail(userDTO.getEmail());
		user.setContact(userDTO.getContact());

		if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		}

		userRepository.save(user);

		return new ApiResponse("User profile updated successfully.");
	}

	// This is for the logic of soft deletion that we talked about
	@Override
	public ApiResponse requestAccountDeletion(Long userId, UserAccountDeletionRequestDTO request) {
		User user = userRepository.findById(userId).orElseThrow(() -> new ApiException("User not found"));

		if (deletionRequestRepository.findByUser(user).isPresent()) {
			throw new ApiException("Deletion request already exists for this user.");
		}

		DeletionRequest deletionRequest = new DeletionRequest();
		deletionRequest.setUser(user);
		deletionRequest.setReason(request.getReason());
		deletionRequest.setStatus(DeletionStatus.PENDING);

		deletionRequestRepository.save(deletionRequest);
		return new ApiResponse("Deletion request submitted. Awaiting admin approval.");
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password"));

		// Here we should add authorities (roles) to the user
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				user.getIsActive(), true, // account is not expired
				true, // credentials are not expired
				true, // account is not locked
				getAuthorities(user) // Pass roles as authorities
		);
	}

	private Collection<? extends GrantedAuthority> getAuthorities(User user) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();

		// Add multiple roles for user if needed
		if (user.getRole() != null) {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
		}

		// If user has multiple roles, make sure all roles are assigned here
		if (user instanceof Player) {
			authorities.add(new SimpleGrantedAuthority("ROLE_PLAYER"));
		}
		if (user instanceof FacilityOwner) {
			authorities.add(new SimpleGrantedAuthority("ROLE_FACILITYOWNER"));
		}
		if (user instanceof Admin) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}

		return authorities;
	}

}
