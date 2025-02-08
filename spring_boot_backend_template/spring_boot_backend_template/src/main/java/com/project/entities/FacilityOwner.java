package com.project.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "facility_owner")
@ToString(callSuper = true, exclude = { "venues", "feedbacks" })
@EqualsAndHashCode(callSuper = true, exclude = { "venues", "feedbacks" })
@NoArgsConstructor
@Getter
@Setter
public class FacilityOwner extends User {
	@OneToMany(mappedBy = "facilityOwner", cascade = CascadeType.ALL)
	private Set<Venue> venues = new HashSet<>();

	@OneToMany(mappedBy = "facilityOwner", cascade = CascadeType.ALL)
	private Set<FeedbackResponse> feedbacks = new HashSet<>();

	public FacilityOwner(String username, @Email(regexp = "^[A-Za-z0-9+_.-]+@(.+)$") String email, String password,
			String contact, Boolean isActive, UserRole role, Set<Venue> venues, Set<FeedbackResponse> feedbacks) {
		super(username, email, password, contact, isActive, role);
		this.venues = venues;
		this.feedbacks = feedbacks;
	}

}
