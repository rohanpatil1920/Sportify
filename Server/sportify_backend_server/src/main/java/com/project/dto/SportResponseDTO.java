package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.SportName;

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
public class SportResponseDTO extends SuperDTO {
	private SportName sportName;
	private Boolean equipmentChoice;
}
