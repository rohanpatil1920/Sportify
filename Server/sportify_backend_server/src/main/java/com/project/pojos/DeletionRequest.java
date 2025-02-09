package com.project.pojos;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "deletion_requests")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = "approvedBy")
public class DeletionRequest extends SuperEntity {

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(columnDefinition = "TEXT")
	private String reason;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DeletionStatus status = DeletionStatus.PENDING;

	@ManyToOne
	@JoinColumn(name = "approved_by")
	private Admin approvedBy;

	@Column(name = "approved_on")
	private LocalDateTime approvedOn;

	public DeletionRequest(User user, String reason, DeletionStatus status, Admin approvedBy,
			LocalDateTime approvedOn) {
		super();
		this.user = user;
		this.reason = reason;
		this.status = status;
		this.approvedBy = approvedBy;
		this.approvedOn = approvedOn;
	}

}
