package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.request.VocaListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.VocaListResponseDto;

import java.util.List;

public interface VocabularyListService {
    void createVocaList(Member memberId);
    VocaListResponseDto getVocaList(Member member, VocaListRequestDto vocaListRequestDto);
}
