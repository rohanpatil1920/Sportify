package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.FeedbackResponse;

public interface FeedbackResponseRepository extends JpaRepository<FeedbackResponse, Long> {

}
