package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {

}
