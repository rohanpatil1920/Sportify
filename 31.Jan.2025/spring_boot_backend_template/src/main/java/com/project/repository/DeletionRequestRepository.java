package com.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.DeletionRequest;
import com.project.pojos.DeletionStatus;
import com.project.pojos.User;

public interface DeletionRequestRepository extends JpaRepository<DeletionRequest, Long> {
	List<DeletionRequest> findByStatus(DeletionStatus status);

	Optional<DeletionRequest> findByUser(User user);
}
