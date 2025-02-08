package com.project.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dao.UserDao;
import com.project.dto.ApiResponse;
import com.project.dto.UserDTO;
import com.project.entities.User;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ApiResponse signUp(UserDTO dto) {
		User userEntity = modelMapper.map(dto, User.class); 
		userDao.save(userEntity);
		return new ApiResponse("UserCreation Successfull!");
	}

	@Override
	public UserDTO singIn(UserDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

}
