package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
