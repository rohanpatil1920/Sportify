package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.Locality;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@ToString(callSuper = true)
public class VenueResponseDTO extends SuperDTO {
	private Long id;
	private String name;
	private String description;
	private Locality locality;
	private AddressDTO address;
	private Long ownerId;

	public VenueResponseDTO(Long id, String name, String description, Locality locality, AddressDTO address,
			Long ownerId) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.locality = locality;
		this.address = address;
		this.ownerId = ownerId;
	}

}