package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.Address;
import com.project.pojos.Locality;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class VenueRequestDTO extends SuperDTO {
	@NotBlank(message = "Venue name is required")
	@Size(min = 5, max = 100, message = "Venue name must be between 5 and 100 characters")
	private String name;

	@NotBlank(message = "Description is required")
	private String description;

	@NotNull(message = "Locality is required")
	private Locality locality;

	@Valid
	@NotNull(message = "Address is required")
	private Address address;
}
