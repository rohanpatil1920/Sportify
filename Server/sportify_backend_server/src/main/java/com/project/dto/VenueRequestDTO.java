package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.Locality;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@ToString(callSuper = true)
public class VenueRequestDTO {

	@NotBlank(message = "Venue name is required")
	@Size(min = 5, max = 100, message = "Venue name must be between 5 and 100 characters")
	private String name;

	@NotBlank(message = "Description is required")
	private String description;

	@NotNull(message = "Locality is required")
	private Locality locality;

	@Valid
	@NotNull(message = "Address is required")
	private AddressDTO address;

	public VenueRequestDTO(
			@NotBlank(message = "Venue name is required") @Size(min = 5, max = 100, message = "Venue name must be between 5 and 100 characters") String name,
			@NotBlank(message = "Description is required") String description,
			@NotNull(message = "Locality is required") Locality locality,
			@Valid @NotNull(message = "Address is required") AddressDTO address) {
		super();
		this.name = name;
		this.description = description;
		this.locality = locality;
		this.address = address;
	}

}
