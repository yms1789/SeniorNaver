package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.SituationProblem;
import com.ssafy.seniornaver.mz.entity.Tag;

public interface TagService {
    void createTag(String word);
    void relationWordTag(Directory wordId, Tag tag);
    void relationProblemTag(SituationProblem problemId, Tag tag);
}
