package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    Optional<Dictionary> findByWordId(Long wordId);
    boolean existsByWord(String word);
}
