package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

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
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@ToString(callSuper = true)
public class AddressDTO {
	@NotBlank(message = "Address Line 1 is required")
	private String adrLine1;

	private String adrLine2;
	@NotBlank(message = "City is required")
	private String city;

	private String state;

	private String country;
	@Pattern(regexp = "\\d{6}", message = "Zip code must be exactly 6 digits")
	private String zipCode;
}
