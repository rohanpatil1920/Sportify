package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class UserAccountDeletionRequestDTO {
	private Long userId;
	private String reason; // temporarily I have given this We can discuss on this, as normally while
							// deleting our account from most of the platforms they ask for a reason why
							// are you leaving us and likewise hence I have added a reason!

}
