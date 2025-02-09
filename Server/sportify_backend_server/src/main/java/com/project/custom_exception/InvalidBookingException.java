package com.project.custom_exception;

public class InvalidBookingException extends RuntimeException {

	public InvalidBookingException(String errMesg) {
		super(errMesg);
	}

}
