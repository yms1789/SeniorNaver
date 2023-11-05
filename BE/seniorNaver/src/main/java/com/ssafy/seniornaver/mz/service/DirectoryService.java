package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.VocabularyList;

public interface DirectoryService {
    void wordSave(VocabularyList listId, Directory wordId);
    void wordDelete(VocabularyList listId, Directory wordId);
}
