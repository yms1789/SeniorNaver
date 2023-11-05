package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import com.ssafy.seniornaver.mz.repository.DirectoryRepository;
import com.ssafy.seniornaver.mz.repository.ScrapWordRepository;
import com.ssafy.seniornaver.mz.repository.VocabularyListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DirectoryServiceImpl implements DirectoryService{

    private final DirectoryRepository directoryRepository;
    private final VocabularyListRepository vocabularyListRepository;
    private final ScrapWordRepository scrapWordRepository;


    @Override
    public void wordSave(VocabularyList listId, Directory wordId) {


    }

    @Override
    public void wordDelete(VocabularyList listId, Directory wordId) {

    }
}
