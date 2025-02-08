package com.project.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "addresses")
@ToString(callSuper = true)
@NoArgsConstructor
@Getter
@Setter
public class Address extends SuperEntity {
	@Column(name = "adr_line1", length = 100)
	private String adrLine1;
	@Column(name = "adr_line2", length = 100)
	private String adrLine2;
	@Column(length = 20)
	private String city;
	@Column(length = 20)
	private String state;
	@Column(length = 20)
	private String country;
	@Column(length = 20, name = "zip_code")
	private String zipCode;

	public Address(String adrLine1, String adrLine2, String city, String state, String country, String zipCode) {
		super();
		this.adrLine1 = adrLine1;
		this.adrLine2 = adrLine2;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
	}

}
