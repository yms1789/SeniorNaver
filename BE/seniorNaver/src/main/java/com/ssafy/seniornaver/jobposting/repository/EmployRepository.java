package com.ssafy.seniornaver.jobposting.repository;

import com.ssafy.seniornaver.jobposting.entity.Employment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployRepository extends JpaRepository<Employment, Long> {
}
