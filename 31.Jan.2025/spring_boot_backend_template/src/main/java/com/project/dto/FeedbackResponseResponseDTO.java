package com.project.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class FeedbackResponseResponseDTO {
	private Long id;
	private String responseText;
	private LocalDateTime createdOn;
	private LocalDateTime updatedOn;
	private UserDTO owner;
}
