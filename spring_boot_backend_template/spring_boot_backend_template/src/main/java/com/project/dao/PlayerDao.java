package com.project.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Player;

public interface PlayerDao extends JpaRepository<Player, Long> {
	Optional<Player> findByEmailAndPassword(String email, String password);
}
