package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.VocabularyList;

public interface DirectoryService {
    DirectoryWordListResponseDto getWordList(int page, Member member);
    void scrapSave(VocabularyList vocaId, Directory wordId);
    void wordSave(VocabularyList vocaId, Directory wordId);
    void wordDelete(VocabularyList vocaId, Directory wordId);

}
