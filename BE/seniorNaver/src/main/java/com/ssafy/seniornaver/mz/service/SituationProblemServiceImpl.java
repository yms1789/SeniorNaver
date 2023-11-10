package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.repository.DictionaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SituationProblemServiceImpl implements SituationProblemService{

    private DictionaryRepository dictionaryRepository;

    @Override
    public boolean wordCheck(String word) {
        return dictionaryRepository.existsByWord(word);
    }

    @Override
    public void createProblem(ProblemCreateRequestDto problemCreateRequestDto) {

    }
}
