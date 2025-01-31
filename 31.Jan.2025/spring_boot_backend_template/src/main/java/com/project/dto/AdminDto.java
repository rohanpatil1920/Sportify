package com.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdminDto {

	@NotNull(message = "ID cannot be null")
	private Long id;

	@NotEmpty(message = "Name cannot be empty")
	private String name;

	@Email(message = "Invalid email format")
	@NotEmpty(message = "Email cannot be empty")
	private String email;

	private boolean isActive;

	public AdminDto(Long id, String name, String email, boolean isActive) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.isActive = isActive;
	}
}
