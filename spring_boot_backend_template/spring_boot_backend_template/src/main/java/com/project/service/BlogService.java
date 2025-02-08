package com.project.service;

import java.util.List;

import com.project.dto.ApiResponse;
import com.project.dto.BlogDTO;
import com.project.dto.BlogPostReqDTO;
import com.project.entities.Blogs;

public interface BlogService {
	
	ApiResponse addPost(BlogPostReqDTO dto);
	List<BlogDTO> getBlogsByBlogger(BlogDTO dto);
	List<BlogDTO> getAllBlogs();
	Blogs viewBlog(Long blogId);
	ApiResponse deleteBlog(Long blogId);
	//ApiResponse replyBlog(BlogDTO dto);
	
	
}
