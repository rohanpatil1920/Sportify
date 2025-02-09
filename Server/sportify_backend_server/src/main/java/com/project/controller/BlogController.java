package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ApiResponse;
import com.project.dto.BlogRequestDTO;
import com.project.service.BlogService;

@RestController
@RequestMapping("/blogs")
@Validated
public class BlogController {

	@Autowired
	private BlogService blogService;
	
	public BlogController() {
		System.out.println("In constructor + "+ getClass());
	}
	
	@PostMapping("/{bloggerId}/newBlog")
	public ResponseEntity<?> addNewBlogPost(@RequestBody 
			BlogRequestDTO dto,@PathVariable Long bloggerId) {
		System.out.println("in add blog post " + dto);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
			.body(blogService.addPost(dto, bloggerId));
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
	
	@GetMapping("/{bloggerId}/user-blogs")
	public ResponseEntity<?> getBlogByBloggerId(@PathVariable Long bloggerId){
		System.out.println("in get Blog By BoggerId");
		try {
			return ResponseEntity.ok(blogService.getBlogsByBlogger(bloggerId));
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete-blog/{blogId}")
	public ResponseEntity<?> deleteBlog(@PathVariable Long blogId){
		System.out.println("in delete blog by id");
		try {
			return ResponseEntity.ok(blogService.deleteBlog(blogId));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
}
