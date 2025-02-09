package com.project.service;

import com.project.dto.ApiResponse;
import com.project.dto.UserAccountDeletionRequestDTO;
import com.project.dto.UserLoginRequestDTO;
import com.project.dto.UserRegistrationRequestDTO;
import com.project.dto.UserResponseDTO;
import com.project.dto.UserUpdationDTO;
import com.project.pojos.UserRole;

public interface UserService {
	UserResponseDTO userSignIn(UserLoginRequestDTO dto);

	ApiResponse playerRegistration(UserRegistrationRequestDTO dto);

	ApiResponse facilityOwnerRegistration(UserRegistrationRequestDTO dto);

	ApiResponse adminRegistration(UserRegistrationRequestDTO dto);

	UserResponseDTO getProfile(Long userId);

	ApiResponse updateProfile(Long userId, UserUpdationDTO userDTO);

	ApiResponse requestAccountDeletion(Long userId, UserAccountDeletionRequestDTO request);

}
