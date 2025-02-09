package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

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
public class FeedbackRequestDTO {
	@NotBlank(message = "Feedback content is required")
	@Size(max = 1000, message = "Feedback cannot exceed 1000 characters")
	private String content;

	@NotNull(message = "Venue ID is required")
	private Long venueId;
}
