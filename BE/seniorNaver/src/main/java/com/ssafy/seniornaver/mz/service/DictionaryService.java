package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.entity.VocabularyList;

import java.util.List;

public interface DictionaryService {
    List<DictionaryWordListResponseDto> getMemberWordList(int page, Member member);
    List<DictionaryWordListResponseDto> getWordList(int page);
    WordDetailResponseDto getWordDetail(Long wordId, Long vocaId);
    void wordScrap(Long vocaId, Long wordId);
    WordDetailResponseDto wordCreate(WordCreateRequestDto wordCreateRequestDto);
    void wordDelete(Long wordId);

}
