package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.pojos.FacilityOwner;
import com.project.pojos.Locality;
import com.project.pojos.SportName;
import com.project.pojos.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
	List<Venue> findByLocality(Locality locality);

	List<Venue> findByFacilityOwner(FacilityOwner facilityOwner);

	@Query("SELECT v FROM Venue v WHERE v.facilityOwner.id = :ownerId")
	List<Venue> findByFacilityOwnerId(@Param("ownerId") Long ownerId);

	@Query("SELECT DISTINCT v FROM Venue v JOIN v.courts c WHERE c.sport.sportName = :sportName")
	List<Venue> findVenuesBySport(@Param("sportName") SportName sportName);
}
