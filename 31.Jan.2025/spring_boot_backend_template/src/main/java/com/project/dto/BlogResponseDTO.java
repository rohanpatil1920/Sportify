package com.project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.pojos.BlogCategory;

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
public class BlogResponseDTO extends SuperDTO {
	private String title;
	private String content;
	private BlogCategory category;
	private UserDTO author;
}
