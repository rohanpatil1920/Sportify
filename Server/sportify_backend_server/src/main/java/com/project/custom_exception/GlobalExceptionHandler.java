package com.project.custom_exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<ApiResponse> handleApiException(ApiException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(ex.getMessage()));
	}

	@ExceptionHandler(AdminNotFoundException.class)
	public ResponseEntity<ApiResponse> handleAdminNotFoundException(AdminNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(ex.getMessage()));
	}
}