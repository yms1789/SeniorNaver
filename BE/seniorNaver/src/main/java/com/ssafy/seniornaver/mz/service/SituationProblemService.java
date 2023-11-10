package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;

public interface SituationProblemService {
    boolean wordCheck(String word);
    void createProblem(ProblemCreateRequestDto problemCreateRequestDto);
}
