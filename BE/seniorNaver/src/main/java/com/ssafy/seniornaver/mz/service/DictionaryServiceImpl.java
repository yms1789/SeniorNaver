package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.entity.*;
import com.ssafy.seniornaver.mz.entity.Dictionary;
import com.ssafy.seniornaver.mz.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DictionaryServiceImpl implements DictionaryService {

    private final DictionaryRepository dictionaryRepository;
    private final SituationRepository situationRepository;
    private final VocabularyListRepository vocabularyListRepository;
    private final ScrapWordRepository scrapWordRepository;

    private final TagService tagService;
    private final TagToWordRepository tagToWordRepository;
    private final TagToProblemRepository tagToProblemRepository;
    private final TagRepository tagRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DictionaryWordListResponseDto> getMemberWordList(int page, Member member) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(member.getVocaId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        Pageable pageable = PageRequest.of(page, 10, Sort.by("word").ascending());
        List<DictionaryWordListResponseDto> wordList = dictionaryRepository.findAll(pageable).stream()
                .map(word -> DictionaryWordListResponseDto.builder()
                        .wordId(word.getWordId())
                        .word(word.getWord())
                        .mean(word.getMean())
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
    public List<DictionaryWordListResponseDto> getWordList(int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("word").ascending());
        List<DictionaryWordListResponseDto> wordList = dictionaryRepository.findAll(pageable).stream()
                .map(word -> DictionaryWordListResponseDto.builder()
                        .wordId(word.getWordId())
                        .word(word.getWord())
                        .mean(word.getMean())
                        .tags(tagToWordRepository.findAllByWordId(word).stream().map(tagToWord -> Tag.builder()
                                        .tag(tagToWord.getWordId().getWord())
                                        .build())
                                .collect(Collectors.toList()))
                        .scrap(false)
                        .build())
                .collect(Collectors.toList());

        return wordList;
    }

    @Override
    public WordDetailResponseDto getWordDetail(Long wordId, Long vocaId) {
        Dictionary word = dictionaryRepository.findByWordId(wordId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        });

        List<String> wordTags = tagToWordRepository.findAllByWordId(word).stream()
                    .map(tagToWord -> tagToWord.getTagId().getTag())
                .collect(Collectors.toList());

        Map<String, Long> relProblem = new HashMap<>();
        tagToWordRepository.findAllByWordId(word).stream()
                .map(tagToWord -> tagToProblemRepository.findAllByTagId(tagToWord.getTagId()).stream()
                        .map(tagToProblem -> relProblem.put(tagToProblem.getProblemId().getTitle(), tagToProblem.getProblemId().getProblemId())));

        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(vocaId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        System.out.println(relProblem);

        return WordDetailResponseDto.builder()
                .word(word.getWord())
                .mean(word.getMean())
                .example(word.getExample())
                .useYear(word.getUseYear())
                .scrap(scrapWordRepository.existsByWordIdAndVocaId(vocabularyList, word))
                .tags(wordTags)
                .relProblem(relProblem)
                .build();
    }

    @Transactional
    @Override
    public void wordScrap(Long vocaId, Long wordId) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(vocaId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        Dictionary word = dictionaryRepository.findByWordId(wordId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        });

        scrapWordRepository.save(ScrapWord.builder()
                        .vocaId(vocabularyList)
                        .wordId(word)
                .build());
    }

    @Override
    @Transactional
    public WordDetailResponseDto wordCreate(WordCreateRequestDto wordCreateRequestDto) {

        Dictionary createWord = Dictionary.builder()
                .word(wordCreateRequestDto.getWord())
                .mean(wordCreateRequestDto.getMean())
                .example(wordCreateRequestDto.getExample())
                .useYear(wordCreateRequestDto.getYear())
                .build();

        System.out.println(createWord.toString());

        // 사전 단어 저장
        dictionaryRepository.saveAndFlush(createWord);

        // 태그 생성하면서 관계 연결 (단어 태그) -> 태그가 있는지 먼저 확인
        for (int i = 0; i < wordCreateRequestDto.getWordTags().size(); i++) {
            tagService.createTag(wordCreateRequestDto.getWordTags().get(i));
            tagService.relationWordTag(createWord,
                    tagRepository.findByTag(wordCreateRequestDto.getWordTags().get(i)).get());
        }

        // 태그 생성하면서 관계 연결 (문제 태그)
        for (int i = 0; i < wordCreateRequestDto.getProblemTags().size(); i++) {
            tagService.createTag(wordCreateRequestDto.getProblemTags().get(i));

            Optional<SituationProblem> situationProblem = situationRepository.findByTitle(wordCreateRequestDto.getProblemTags().get(i));
            if (!situationProblem.isPresent()) { continue;}

            tagService.relationProblemTag(situationProblem.get(),
                    tagRepository.findByTag(wordCreateRequestDto.getProblemTags().get(i)).get());
        }

        List<String> wordTags = tagToWordRepository.findAllByWordId(createWord).stream()
                .map(tags -> tags.getTagId().getTag())
                .collect(Collectors.toList());

        Map<String, Long> problemTags = new HashMap<>();
        for (int i = 0; i < wordCreateRequestDto.getProblemTags().size(); i++) {
            Optional<SituationProblem> problem = situationRepository.findByTitle(wordCreateRequestDto.getProblemTags().get(i));

            SituationProblem situationProblem;
            if (!problem.isPresent()) { continue; }
            else { situationProblem = problem.get(); }
            problemTags.put(situationProblem.getTitle(), situationProblem.getProblemId());
        }

        return WordDetailResponseDto.builder()
                .word(createWord.getWord())
                .mean(createWord.getMean())
                .example(createWord.getExample())
                .useYear(createWord.getUseYear())
                .tags(wordTags)
                .relProblem(problemTags)
                .build();
    }

    @Override
    @Transactional
    public void wordDelete(Long wordId) {

        Dictionary word = dictionaryRepository.findById(wordId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        });

        dictionaryRepository.delete(word);
    }
}
