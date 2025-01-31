package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Court;
import com.project.pojos.Sport;
import com.project.pojos.Venue;

public interface CourtRepository extends JpaRepository<Court, Long> {
	List<Court> findByVenue(Venue venue);

	List<Court> findBySport(Sport sport);

}
