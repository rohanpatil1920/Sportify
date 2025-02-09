package com.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Blogs;
import com.project.pojos.Player;


public interface BlogRepository extends JpaRepository<Blogs, Long> {
      Optional<Blogs> findByAuthor(Player author);
      List<Blogs> findByAuthorId(Long bloggerId);
}
