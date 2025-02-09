package com.project.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	@GetMapping("/test")
	public Map<Integer, String> test() {
		return Map.of(1, "A", 2, "B", 3, "C", 4, "D", 5, "E");
	}
}
