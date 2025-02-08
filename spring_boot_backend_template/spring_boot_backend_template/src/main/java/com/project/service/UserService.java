package com.project.service;

import com.project.dto.ApiResponse;
import com.project.dto.UserDTO;


public interface UserService {
	public ApiResponse signUp(UserDTO dto);
	public UserDTO singIn(UserDTO dto);
}
