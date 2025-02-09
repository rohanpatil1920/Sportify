package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "password")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserLoginRequestDTO {
	@NotBlank(message = "Email must be not null n not blank!!!!")
	@Email(message = "Invalid email format")
	private String email;
	@NotBlank
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "Password must be 8+ characters, include letters, numbers, and special characters (#@$*)")
	private String password;

}
