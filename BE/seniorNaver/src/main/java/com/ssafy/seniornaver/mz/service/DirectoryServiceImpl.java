package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.entity.Directory;
import com.ssafy.seniornaver.mz.entity.ScrapWord;
import com.ssafy.seniornaver.mz.entity.Tag;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import com.ssafy.seniornaver.mz.repository.*;
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
    private final TagToWordRepository tagToWordRepository;
    private final TagRepository tagRepository;
    private final VocabularyListRepository vocabularyListRepository;
    private final ScrapWordRepository scrapWordRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DirectoryWordListResponseDto> getMemberWordList(int page, Member member) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(member.getVocaId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        Pageable pageable = PageRequest.of(page, 10, Sort.by("word").ascending());
        List<DirectoryWordListResponseDto> wordList = directoryRepository.findAll(pageable).stream()
                .map(word -> DirectoryWordListResponseDto.builder()
                        .word(word.getWord())
                        .mean(word.getMean())
                        .example(word.getExample())
                        .tags(tagToWordRepository.findAllByWordId(word).stream().map(tagToWord -> Tag.builder()
                                .tag(tagToWord.getWordId().getWord())
                                .build())
                            .collect(Collectors.toList()))
                        .scrap(scrapWordRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                .anyMatch(scrapWord -> scrapWord.getWordId().getWordId() == word.getWordId()))
                        .build())
                .collect(Collectors.toList());

        return wordList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DirectoryWordListResponseDto> getWordList(int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("word").ascending());
        List<DirectoryWordListResponseDto> wordList = directoryRepository.findAll(pageable).stream()
                .map(word -> DirectoryWordListResponseDto.builder()
                        .word(word.getWord())
                        .mean(word.getMean())
                        .example(word.getExample())
                        .tags(tagToWordRepository.findAllByWordId(word).stream().map(tagToWord -> Tag.builder()
                                        .tag(tagToWord.getWordId().getWord())
                                        .build())
                                .collect(Collectors.toList()))
                        .scrap(false)
                        .build())
                .collect(Collectors.toList());

        return wordList;
    }

    @Transactional
    @Override
    public void wordScrap(VocabularyList vocaId, Directory wordId) {
        scrapWordRepository.save(ScrapWord.builder()
                        .vocaId(vocaId)
                        .wordId(wordId)
                .build());
    }

    @Override
    @Transactional
    public WordDetailResponseDto wordCreate(WordCreateRequestDto wordCreateRequestDto) {

        Directory createWord = Directory.builder()
                .word(wordCreateRequestDto.getWord())
                .mean(wordCreateRequestDto.getMean())
                .example(wordCreateRequestDto.getExample())
                .useYear(wordCreateRequestDto.getYear())
                .build();

        // 태그 만들어지면서 줄줄이 만들어져야함.
        for (int i = 0; i < wordCreateRequestDto.getTag().size(); i++) {
            tagRepository.save(Tag.builder()
                    .tag(wordCreateRequestDto.getTag().get(i))
                    .build());
        }

        directoryRepository.saveAndFlush(createWord);

        return WordDetailResponseDto.builder()
                .word(createWord.getWord())
                .mean(createWord.getMean())
                .example(createWord.getExample())
                .useYear(createWord.getUseYear())
                .build();
    }

    @Override
    @Transactional
    public void wordDelete(Long wordId) {

        Directory word = directoryRepository.findById(wordId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        });

        directoryRepository.delete(word);
    }
}
