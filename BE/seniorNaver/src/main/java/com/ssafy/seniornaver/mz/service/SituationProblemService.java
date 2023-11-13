package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.ProblemListResponseDto;
import com.ssafy.seniornaver.mz.entity.SituationProblem;

import java.util.List;

public interface SituationProblemService {
    boolean wordCheck(String word);
    SituationProblem createProblem(ProblemCreateRequestDto problemCreateRequestDto, Member member);
    void relTagToProblem(SituationProblem situationProblem, ProblemCreateRequestDto problemCreateRequestDto);
    List<ProblemListResponseDto> getProblemList(ProblemCreateRequestDto problemCreateRequestDto);
}