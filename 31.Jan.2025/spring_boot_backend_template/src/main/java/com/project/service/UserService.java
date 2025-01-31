package com.project.service;

import com.project.dto.ApiResponse;
import com.project.dto.UserLoginRequestDTO;
import com.project.dto.UserRegistrationRequestDTO;
import com.project.dto.UserResponseDTO;

public interface UserService {
	UserResponseDTO userSignIn(UserLoginRequestDTO dto);

	ApiResponse playerRegistration(UserRegistrationRequestDTO dto);

	ApiResponse facilityOwnerRegistration(UserRegistrationRequestDTO dto);

	ApiResponse adminRegistration(UserRegistrationRequestDTO dto);
}
