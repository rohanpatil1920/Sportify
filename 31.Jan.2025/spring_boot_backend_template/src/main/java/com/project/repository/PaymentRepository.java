package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pojos.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
