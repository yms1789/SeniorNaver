package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Directory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DirectoryRepository extends JpaRepository<Directory, Long> {
    Optional<Directory> findByWordId(Long wordId);
}
