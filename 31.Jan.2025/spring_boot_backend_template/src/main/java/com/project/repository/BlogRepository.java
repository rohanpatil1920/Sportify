package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Blogs;

public interface BlogRepository extends JpaRepository<Blogs, Long> {

}
