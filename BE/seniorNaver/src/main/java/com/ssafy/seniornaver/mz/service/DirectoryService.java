package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.VocabularyList;

import java.util.List;

public interface DirectoryService {
    List<DirectoryWordListResponseDto> getMemberWordList(int page, Member member);
    List<DirectoryWordListResponseDto> getWordList(int page);
    void wordScrap(Long vocaId, Long wordId);
    WordDetailResponseDto wordCreate(WordCreateRequestDto wordCreateRequestDto);
    void wordDelete(Long wordId);

}
