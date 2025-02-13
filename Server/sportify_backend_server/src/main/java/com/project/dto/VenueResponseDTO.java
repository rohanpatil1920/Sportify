package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.Locality;

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
public class VenueResponseDTO extends SuperDTO {

	private String name;
	private String description;
	private Locality locality;
	private AddressDTO address;
	private Long ownerId;
}