package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTag(String tag);
    boolean existsByTag(String tag);
    List<Tag> findAllByTagContaining(String tag);
}