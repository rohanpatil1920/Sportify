package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.custom_exception.AdminNotFoundException;
import com.project.dto.AdminDto;
import com.project.dto.UserDTO;
import com.project.pojos.Admin;
import com.project.pojos.FacilityOwner;
import com.project.pojos.Player;
import com.project.repository.AdminRepository;
import com.project.repository.FacilityOwnerRepository;
import com.project.repository.PlayerRepository;

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

}
