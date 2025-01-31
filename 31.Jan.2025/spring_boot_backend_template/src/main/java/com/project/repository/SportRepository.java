package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Sport;

public interface SportRepository extends JpaRepository<Sport, Long> {

}
