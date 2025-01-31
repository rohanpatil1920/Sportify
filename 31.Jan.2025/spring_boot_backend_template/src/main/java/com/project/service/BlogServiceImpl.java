package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.ApiResponse;
import com.project.dto.BlogRequestDTO;
import com.project.dto.BlogResponseDTO;
import com.project.pojos.Blogs;
import com.project.pojos.Player;
import com.project.repository.BlogRepository;
import com.project.repository.PlayerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {

	@Autowired
	private PlayerRepository playerDao;
	@Autowired
	private BlogRepository blogDao;
//	@Autowired
//	private UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ApiResponse addPost(BlogRequestDTO dto,Long bloggerId) {
		Player blogger = playerDao.findById(bloggerId).orElseThrow();
		Blogs blogPostEntity = modelMapper.map(dto,Blogs.class);
		blogPostEntity.setAuthor(blogger);
		blogDao.save(blogPostEntity);
		return new ApiResponse("Blog is Created!");
	}

	@Override
	public List<BlogResponseDTO> getBlogsByBlogger(Long bloggerId) {
//		Player player = playerDao.findById(blogPost.getAuthor().getId()).orElseThrow();
		return blogDao.findByAuthorId(bloggerId)
				.stream()
				.map(post -> modelMapper.map(post, BlogResponseDTO.class))
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
	public List<BlogResponseDTO> getAllBlogs() {
		return blogDao.findAll()
				.stream()
				.map(post->modelMapper.map(post, BlogResponseDTO.class)).
				collect(Collectors.toList());
	}
	
	
}
