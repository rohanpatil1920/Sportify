package com.project.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.repository.PlayerRepository;
import com.project.repository.UserRepository;

@Service
@org.springframework.transaction.annotation.Transactional
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private UserRepository userRepository;

}
