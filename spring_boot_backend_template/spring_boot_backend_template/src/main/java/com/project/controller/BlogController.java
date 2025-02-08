package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ApiResponse;
import com.project.dto.BlogDTO;
import com.project.dto.BlogPostReqDTO;
import com.project.service.BlogService;

@RestController
@RequestMapping("/blogs")
public class BlogController {

	@Autowired
	private BlogService blogService;
	
	public BlogController() {
		System.out.println("In constructor + "+ getClass());
	}
	
	@PostMapping("/newBlog")
	public ResponseEntity<?> addNewBlogPost(@RequestBody 
			BlogPostReqDTO dto) {
		System.out.println("in add blog post " + dto);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
			.body(blogService.addPost(dto));
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@GetMapping("/all-blogs")
	public ResponseEntity<?> getAllBlogs(){
		System.out.println("in get All Blogs");
		try {
			return ResponseEntity.ok(blogService.getAllBlogs());
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/user-blogs")
	public ResponseEntity<?> getBlogByBloggerId(@RequestBody BlogDTO dto){
		System.out.println("in get Blog By BoggerId");
		try {
			return ResponseEntity.ok(blogService.getBlogsByBlogger(dto));
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
}
