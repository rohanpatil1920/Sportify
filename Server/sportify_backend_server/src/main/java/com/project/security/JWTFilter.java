package com.project.security;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.custom_exception.AuthenticationException;
import com.project.pojos.User;
import com.project.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter {

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");

		Authentication auth = null;

		if (validHeader) {
			String token = authHeader.replace("Bearer", "").trim();
			Map<String, Object> subject = jwtUtil.validateToken(token);
			String email = (String) (subject.get("email"));
			String role = (String) (subject.get("role"));

			User user = userRepository.findByEmail(email)
					.orElseThrow(() -> new AuthenticationException("User not found"));

			if (user != null) {
				List<GrantedAuthority> authorities = java.util.Collections
						.singletonList(new SimpleGrantedAuthority(role));
				auth = new UsernamePasswordAuthenticationToken(user, null, authorities);
			}

		}

		if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null)
			SecurityContextHolder.getContext().setAuthentication(auth);

		filterChain.doFilter(request, response);
	}

}
