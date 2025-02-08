package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dao.BlogRepository;
import com.project.dao.PlayerDao;
import com.project.dto.ApiResponse;
import com.project.dto.BlogDTO;
import com.project.dto.BlogPostReqDTO;
import com.project.entities.Blogs;
import com.project.entities.Player;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {

	@Autowired
	private PlayerDao playerDao;
	@Autowired
	private BlogRepository blogDao;
//	@Autowired
//	private UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ApiResponse addPost(BlogPostReqDTO dto) {
		Player blogger = playerDao.findById(dto.getBloggerId()).orElseThrow();
		Blogs blogPostEntity = modelMapper.map(dto,Blogs.class);
		blogPostEntity.setAuthor(blogger);
		blogDao.save(blogPostEntity);
		return new ApiResponse("Blog is Created!");
	}

	@Override
	public List<BlogDTO> getBlogsByBlogger(BlogDTO dto) {
		Blogs blogPost = modelMapper.map(dto, Blogs.class);
//		Player player = playerDao.findById(blogPost.getAuthor().getId()).orElseThrow();
		return blogDao.findByAuthorId(blogPost.getAuthor().getId())
				.stream()
				.map(post -> modelMapper.map(post, BlogDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Blogs viewBlog(Long blogId) {
		return blogDao.findById(blogId).orElseThrow();
	}

	@Override
	public ApiResponse deleteBlog(Long blogId) {
		blogDao.deleteById(blogId);
		return new ApiResponse("BlogPost Deleted");
	}

//	@Override
//	public ApiResponse replyBlog(BlogDTO dto) {
//		return null;
//	}

	@Override
	public List<BlogDTO> getAllBlogs() {
		return blogDao.findAll()
				.stream()
				.map(post->modelMapper.map(post, BlogDTO.class)).
				collect(Collectors.toList());
	}
	
	
}
