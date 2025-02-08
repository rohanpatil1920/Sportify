package com.project.pojos;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "venue")
@ToString(callSuper = true, exclude = { "facilityOwner", "courts" })
@EqualsAndHashCode(callSuper = true, exclude = { "courts" })
@NoArgsConstructor
@Getter
@Setter

public class Venue extends SuperEntity {

	@Column(length = 30, nullable = false)
	private String name;
	@Column(length = 300, nullable = false)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Locality locality;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id")
	private Address venueAddress;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "facility_owner_id", nullable = false)
	private FacilityOwner facilityOwner;

	@OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Court> courts = new HashSet<>(); // Orphan Removal: Ensures courts are automatically deleted when
													// removed from a venue
													// Non-nullable Constraint: A court must belong to a venue

	public Venue(String name, String description, Locality locality, Address venueAddress, FacilityOwner facilityOwner,
			Set<Court> courts) {
		super();
		this.name = name;
		this.description = description;
		this.locality = locality;
		this.venueAddress = venueAddress;
		this.facilityOwner = facilityOwner;
		this.courts = courts;
	}

}
