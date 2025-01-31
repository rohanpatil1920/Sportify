package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
