package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.ScrapWord;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import com.ssafy.seniornaver.mz.repository.DirectoryRepository;
import com.ssafy.seniornaver.mz.repository.ScrapWordRepository;
import com.ssafy.seniornaver.mz.repository.VocabularyListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DirectoryServiceImpl implements DirectoryService{

    private final DirectoryRepository directoryRepository;
    private final VocabularyListRepository vocabularyListRepository;
    private final ScrapWordRepository scrapWordRepository;

    @Override
    public DirectoryWordListResponseDto getWordList(int page, Member member) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(member.getVocaId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        Pageable pageable = PageRequest.of(page, 10, Sort.by("word").descending());
        List<DirectoryWordListResponseDto> wordList = directoryRepository.findAll(pageable).stream()
                .map(word -> DirectoryWordListResponseDto.builder()
                        .word(word.getWord())
                        .mean(word.getMean())
                        .example(word.getExample())
                        .tags(word.getTags())
                        .complete(vocabularyList.getCompleteProblems().stream().anyMatch(problem ->
                                problem.getProblemId().equals(word.getWordId())))
                        .build())
                .collect(Collectors.toList());

        return null;
    }

    @Transactional
    @Override
    public void scrapSave(VocabularyList vocaId, Directory wordId) {
        scrapWordRepository.save(ScrapWord.builder()
                        .vocaId(vocaId)
                        .wordId(wordId)
                .build());
    }

    @Override
    public void wordSave(VocabularyList vocaId, Directory wordId) {
    }

    @Override
    public void wordDelete(VocabularyList vocaId, Directory wordId) {

    }
}
