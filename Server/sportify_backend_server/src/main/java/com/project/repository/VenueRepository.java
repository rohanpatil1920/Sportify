package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.FacilityOwner;
import com.project.pojos.Locality;
import com.project.pojos.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
	List<Venue> findByLocality(Locality locality);

	List<Venue> findByFacilityOwner(FacilityOwner facilityOwner);
}
