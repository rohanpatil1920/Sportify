package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.entities.UserRole;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserDTO extends SuperDTO {
	
	private String username;
	private String email;
	private String password;
	private String contact;
	private UserRole role;
	
}
