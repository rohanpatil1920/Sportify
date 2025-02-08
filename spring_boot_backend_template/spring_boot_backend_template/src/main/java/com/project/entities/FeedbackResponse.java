package com.project.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "feedback_response")
@ToString(callSuper = true, exclude = { "feedback", "facilityOwner" })
@NoArgsConstructor
@Getter
@Setter

public class FeedbackResponse extends SuperEntity {

	@Lob
	@Column(name = "response_text")
	private String responseText;

	@OneToOne
	@JoinColumn(name = "feedback_id")
	private Feedback feedback;

	@ManyToOne
	@JoinColumn(name = "facility_owner_id")
	private FacilityOwner facilityOwner;

	public FeedbackResponse(String responseText, Feedback feedback, FacilityOwner facilityOwner) {
		super();
		this.responseText = responseText;
		this.feedback = feedback;
		this.facilityOwner = facilityOwner;
	}

//	@Column(nullable = false)
//	private LocalDateTime responseDate;
}
