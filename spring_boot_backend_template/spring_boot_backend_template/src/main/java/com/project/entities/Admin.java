package com.project.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "admin")
@ToString(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
public class Admin extends User {
	public Admin(String username, String email, String password, String contact, Boolean isActive) {
		super(username, email, password, contact, isActive, UserRole.ADMIN); // Here I have removed the role from
																				// constructor as it should be
																				// pre-defined (An Admin will always
																				// have ADMIN role)
	}

}
