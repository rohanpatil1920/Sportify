package com.project.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "blogs")
@ToString(callSuper = true, exclude = { "author" })
@NoArgsConstructor
@Getter
@Setter
public class Blogs extends SuperEntity {

	@Column(name = "title", nullable = false, length = 150)
	private String title;

	@Lob
	@Column(name = "content")
	private String content;

	@Enumerated(EnumType.STRING)
	@Column(name = "category", nullable = false)
	private BlogCategory category;

	@ManyToOne
	@JoinColumn(name = "author_id", nullable = false)
	private Player author;

	public Blogs(String title, String content, BlogCategory category, Player author) {
		super();
		this.title = title;
		this.content = content;
		this.category = category;
		this.author = author;
	}

//	@ManyToOne
//	@JoinColumn(name = "parent_post_id")
//	private Blogs parentPost;
//
//	@OneToMany(mappedBy = "parentPost")
//	private Set<Blogs> replies = new HashSet<>();
}
