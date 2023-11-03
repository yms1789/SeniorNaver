package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}