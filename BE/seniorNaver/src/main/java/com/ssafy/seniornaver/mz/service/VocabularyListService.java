package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.response.VocaListResponseDto;

public interface VocabularyListService {
    VocaListResponseDto getVocaList(Member memberId);
    void createVocaList(Member memberId);
}
