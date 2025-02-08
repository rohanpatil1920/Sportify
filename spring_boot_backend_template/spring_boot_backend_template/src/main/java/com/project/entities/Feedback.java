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
@Table(name = "feedback")
@ToString(callSuper = true, exclude = { "player", "venue", "response" })
@NoArgsConstructor
@Getter
@Setter

public class Feedback extends SuperEntity {

	@Lob
	@Column(name = "content")
	private String content;

	@ManyToOne
	@JoinColumn(name = "player_id")
	private Player player;

	@ManyToOne
	@JoinColumn(name = "venue_id")
	private Venue venue;

	@OneToOne(mappedBy = "feedback")
	private FeedbackResponse response;

	public Feedback(String content, Player player, Venue venue, FeedbackResponse response) {
		super();
		this.content = content;
		this.player = player;
		this.venue = venue;
		this.response = response;
	}

}
