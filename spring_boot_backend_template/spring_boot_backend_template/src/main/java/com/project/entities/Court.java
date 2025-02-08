package com.project.entities;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "court")
@ToString(callSuper = true, exclude = { "venue", "sport" })
@NoArgsConstructor
@Getter
@Setter

public class Court extends SuperEntity {

	@Column(name = "price_per_hour", precision = 10, scale = 2)
	@DecimalMin(value = "0.0", inclusive = false)
	private BigDecimal pricePerHour;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "venue_id", nullable = false)
	private Venue venue;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sport_id", nullable = false)
	private Sport sport;

	@OneToMany(mappedBy = "court", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Booking> bookings = new HashSet<>();

	public Court(@DecimalMin(value = "0.0", inclusive = false) BigDecimal pricePerHour, Venue venue, Sport sport) {
		super();
		this.pricePerHour = pricePerHour;
		this.venue = venue;
		this.sport = sport;
	}

}
