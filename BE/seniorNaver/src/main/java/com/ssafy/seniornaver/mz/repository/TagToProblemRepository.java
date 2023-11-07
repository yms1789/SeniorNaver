package com.ssafy.seniornaver.mz.repository;

import com.ssafy.seniornaver.mz.entity.SituationProblem;
import com.ssafy.seniornaver.mz.entity.TagToProblem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagToProblemRepository extends JpaRepository<TagToProblem, Long> {
    List<TagToProblem> findAllByProblemId(SituationProblem problemId);
}
