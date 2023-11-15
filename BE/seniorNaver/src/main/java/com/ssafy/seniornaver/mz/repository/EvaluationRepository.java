package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.EvaluationResult;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<EvaluationResult, Long> {
    @Query(value = "SELECT * FROM seniornaver.evaluation_result as er WHERE er.vocabulary_list = vocabulary_list ORDER BY create_at DESC LIMIT 5", nativeQuery = true)
    List<EvaluationResult> findAllByVocaId(VocabularyList vocabularyList);
}
