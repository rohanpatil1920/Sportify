package com.project.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class UserRegistrationResponseDTO extends SuperDTO {
	private Long id;
	private String username;
	private String email;
	private String contact;
	private LocalDateTime createdOn;
}
