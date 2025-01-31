package com.project.service;

import java.util.List;

import com.project.dto.ApiResponse;
import com.project.dto.BlogRequestDTO;
import com.project.dto.BlogResponseDTO;
import com.project.pojos.Blogs;


public interface BlogService {
	
	ApiResponse addPost(BlogRequestDTO dto,Long bloggerId);
	List<BlogResponseDTO> getBlogsByBlogger(Long bloggerId);
	List<BlogResponseDTO> getAllBlogs();
	Blogs viewBlog(Long blogId);
	ApiResponse deleteBlog(Long blogId);
	//ApiResponse replyBlog(BlogDTO dto);
	
	
}
