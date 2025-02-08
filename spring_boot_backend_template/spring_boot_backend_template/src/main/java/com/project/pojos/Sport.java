package com.project.pojos;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "sport")
@ToString(callSuper = true, exclude = "courts")
@EqualsAndHashCode(callSuper = true, exclude = { "courts" })
@NoArgsConstructor
@Getter
@Setter

public class Sport extends SuperEntity {
	@Column(nullable = false, name = "equipment_choice")
	private Boolean equipmentChoice;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SportName sportName;

	@OneToMany(mappedBy = "sport")
	private Set<Court> courts = new HashSet<>();

	public Sport(Boolean equipmentChoice, SportName sportName, Set<Court> courts) {
		super();
		this.equipmentChoice = equipmentChoice;
		this.sportName = sportName;
		this.courts = courts;
	}

}
