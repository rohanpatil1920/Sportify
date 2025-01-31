package com.project.pojos;

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
@Table(name = "player")
//@ToString(callSuper = true, exclude = { "blogs", "bookings", "feedbacks", "payments" })
@ToString(callSuper = true, exclude = { "blogs", "bookings", "feedbacks" })
@EqualsAndHashCode(callSuper = true, exclude = { "blogs", "bookings", "feedbacks" })
@NoArgsConstructor
@Getter
@Setter
public class Player extends User {
	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
	private Set<Booking> bookings = new HashSet<>();

	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	private Set<Blogs> blogs = new HashSet<>();

	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
	private Set<Feedback> feedbacks = new HashSet<>();

	public Player(String username, @Email(regexp = "^[A-Za-z0-9+_.-]+@(.+)$") String email, String password,
			String contact, Boolean isActive, UserRole role, Set<Booking> bookings, Set<Blogs> blogs,
			Set<Feedback> feedbacks) {
		super(username, email, password, contact, isActive, role);
		this.bookings = bookings;
		this.blogs = blogs;
		this.feedbacks = feedbacks;
	}

//	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
//	private Set<Payment> payments = new HashSet<>();

//	public Player(String username, String email, String password, String contact, Boolean isActive, UserRole role,
//			Set<Booking> bookings, Set<Blogs> blogs, Set<Feedback> feedbacks, Set<Payment> payments) {
//		super(username, email, password, contact, isActive, role);
//		this.bookings = bookings;
//		this.blogs = blogs;
//		this.feedbacks = feedbacks;
//		this.payments = payments;
//	}

}
