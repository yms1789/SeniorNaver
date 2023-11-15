package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.dto.request.DictionaryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
import com.ssafy.seniornaver.mz.entity.Dictionary;
import com.ssafy.seniornaver.mz.entity.SituationProblem;
import com.ssafy.seniornaver.mz.entity.Tag;

import java.util.List;

public interface TagService {
    void createTag(String word);
    void relationWordTag(Dictionary wordId, Tag tag);
    void relationProblemTag(SituationProblem problemId, Tag tag);
    List<DictionaryWordListResponseDto> tagSearch(DictionaryWordListRequestDto dictionaryWordListRequestDto);
}
