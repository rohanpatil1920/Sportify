package com.project.dto;

import java.time.LocalDateTime;

import com.project.pojos.DeletionStatus;

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
public class DeletionRequestDTO {
	private Long requestId;
	private Long userId;
	private String username;
	private String reason;
	private DeletionStatus status;
	private LocalDateTime createdOn;
}
