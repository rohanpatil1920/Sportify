package com.project.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // First it was single table then changed to Joined cause the
												// joined
												// tables were getting created in the DB
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class User extends SuperEntity {

	@Column(length = 25, unique = true, nullable = false)
	private String username;
	@Column(length = 25, unique = true, nullable = false)
	@Email(regexp = "^[A-Za-z0-9+_.-]+@(.+)$") // This regex check is also from StackOverflow it is normally used hence
												// I have added it here for validation.
	private String email;

	// This I have gotten from StackOverflow
	// this we can use to always store the email in lowercase in the DB.
	// When we insert or update a user, this method will be called to convert the
	// email to lowercase.
	// This will avoid the problem of case matching and duplicates.
	@PrePersist
	@PreUpdate
	public void normalizeEmail() {
		if (this.email != null) {
			this.email = this.email.toLowerCase();
		}
	}

	@Column(length = 80, nullable = false)
	private String password;
	@Column(length = 25, nullable = false, unique = true)
	private String contact;
	@Column(nullable = false, name = "is_active")
	private Boolean isActive;
	@Enumerated(EnumType.STRING)
	@Column(length = 25, nullable = false)
	private UserRole role;

	public User(String username, @Email(regexp = "^[A-Za-z0-9+_.-]+@(.+)$") String email, String password,
			String contact, Boolean isActive, UserRole role) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.contact = contact;
		this.isActive = isActive;
		this.role = role;
	}

}
