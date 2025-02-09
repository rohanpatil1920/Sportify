package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.service.PlayerService;
import com.project.service.UserService;

@RestController
@RequestMapping("/players")
public class PlayerController {
	@Autowired
	private PlayerService playerService;
	@Autowired
	private UserService userService;

}
