package com.project.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuperDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime createdOn;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedOn;
}
