package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.BlogCategory;

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
public class BlogRequestDTO {
	@NotBlank(message = "Title is required")
	@Size(max = 150, message = "Title cannot exceed 150 characters")
	private String title;

	@NotBlank(message = "Content is required")
	private String content;

	@NotNull(message = "Category is required")
	private BlogCategory category;
}
