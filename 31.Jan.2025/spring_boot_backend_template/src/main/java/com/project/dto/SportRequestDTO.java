package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.SportName;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class SportRequestDTO {
	@NotBlank(message = "Sport name is required")
	private SportName sportName;

	@NotNull(message = "Equipment choice status is required")
	private boolean equipmentChoice;
}
