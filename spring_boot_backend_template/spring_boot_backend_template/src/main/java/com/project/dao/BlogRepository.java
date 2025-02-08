package com.project.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Blogs;
import com.project.entities.Player;


public interface BlogRepository extends JpaRepository<Blogs, Long> {
      Optional<Blogs> findByAuthor(Player author);
      List<Blogs> findByAuthorId(Long bloggerId);
}
