package com.project.dto;

import com.project.entities.BlogCategory;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class BlogDTO extends SuperDTO{
	
	@NotBlank
	private String title;
		
	private String content;
	@NotBlank
	private BlogCategory category;
	
	

}
