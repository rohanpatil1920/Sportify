package com.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogPostReqDTO {
	private String title;
	private String description;
	private String content;
	private Long categoryId;
	private Long bloggerId;
}
