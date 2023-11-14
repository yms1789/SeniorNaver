package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.request.DictionaryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;

import java.util.List;

public interface DictionaryService {
    DictionaryWordListResponseDto getMemberWordList(DictionaryWordListRequestDto requestDto, Member member);
    DictionaryWordListResponseDto getWordList(DictionaryWordListRequestDto requestDto);
    DictionaryWordListResponseDto getTagMemberWordList(DictionaryWordListRequestDto requestDto, Member member);
    DictionaryWordListResponseDto getTagWordList(DictionaryWordListRequestDto requestDto);
    WordDetailResponseDto getWordDetail(Long wordId, Long vocaId);
    void wordScrap(Long vocaId, Long wordId);
    void unScrap(Long vocaId, Long wordId);
    WordDetailResponseDto wordCreate(WordCreateRequestDto wordCreateRequestDto);
    void wordDelete(Long wordId, Member member);

}
