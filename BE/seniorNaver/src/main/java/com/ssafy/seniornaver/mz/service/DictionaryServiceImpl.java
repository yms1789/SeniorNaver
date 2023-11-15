package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.AuthenticationException;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.DictionaryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.entity.Dictionary;
import com.ssafy.seniornaver.mz.entity.ScrapWord;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import com.ssafy.seniornaver.mz.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DictionaryServiceImpl implements DictionaryService {

    private final DictionaryRepository dictionaryRepository;
    private final VocabularyListRepository vocabularyListRepository;
    private final ScrapWordRepository scrapWordRepository;

    private final TagService tagService;
    private final TagToWordRepository tagToWordRepository;
    private final TagToProblemRepository tagToProblemRepository;
    private final TagRepository tagRepository;

    @Override
    @Transactional(readOnly = true)
    public DictionaryWordListResponseDto getMemberWordList(DictionaryWordListRequestDto requestDto, Member member) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(member.getVocaId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });


        Pageable pageable = PageRequest.of(requestDto.getPage(), 5, Sort.by("word").ascending());

        // 키워드 검색시
        if (requestDto.getKeyword() != null) {
            // 연도가 있으면
            if (requestDto.getYear() != null) {
                return null;
            } else {
                List<DictionaryWordListResponseDto.Item> words = dictionaryRepository.findAllByWordContaining(requestDto.getKeyword(), pageable).stream()
                        .map(word -> DictionaryWordListResponseDto.Item.builder()
                                .wordId(word.getWordId())
                                .word(word.getWord())
                                .mean(word.getMean())
                                .year(word.getUseYear())
                                .scrap(scrapWordRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                        .anyMatch(scrapWord -> scrapWord.getWordId().getWordId() == word.getWordId()))
                                .build())
                        .collect(Collectors.toList());

                return DictionaryWordListResponseDto.builder()
                        .page(requestDto.getPage() + 1)
                        .totalPage(getTotalPage(dictionaryRepository.findAllByWordContaining(requestDto.getKeyword()).size()))
                        .items(words)
                        .build();
            }
        } else {
            List<DictionaryWordListResponseDto.Item> wordList = dictionaryRepository.findAll(pageable).stream()
                    .map(word -> DictionaryWordListResponseDto.Item.builder()
                            .wordId(word.getWordId())
                            .word(word.getWord())
                            .mean(word.getMean())
                            .scrap(scrapWordRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                    .anyMatch(scrapWord -> scrapWord.getWordId().getWordId() == word.getWordId()))
                            .build())
                    .collect(Collectors.toList());

            return DictionaryWordListResponseDto.builder()
                    .page(requestDto.getPage() + 1)
                    .totalPage(getTotalPage(dictionaryRepository.findAll().size()))
                    .items(wordList)
                    .build();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public DictionaryWordListResponseDto getWordList(DictionaryWordListRequestDto requestDto) {
        Pageable pageable = PageRequest.of(requestDto.getPage(), 5, Sort.by("word").ascending());

        if (requestDto.getKeyword() != null) {
            // 키워드 검색시
            List<DictionaryWordListResponseDto.Item> words = dictionaryRepository.findAllByWordContaining(requestDto.getKeyword(), pageable).stream()
                    .map(word -> DictionaryWordListResponseDto.Item.builder()
                            .wordId(word.getWordId())
                            .word(word.getWord())
                            .mean(word.getMean())
                            .year(word.getUseYear())
                            .scrap(false)
                            .build())
                    .collect(Collectors.toList());

            return DictionaryWordListResponseDto.builder()
                    .page(requestDto.getPage() + 1)
                    .totalPage(getTotalPage(dictionaryRepository.findAllByWordContaining(requestDto.getKeyword()).size()))
                    .items(words)
                    .build();

        } else {
            List<DictionaryWordListResponseDto.Item> words = dictionaryRepository.findAll(pageable).stream()
                    .map(word -> DictionaryWordListResponseDto.Item.builder()
                            .wordId(word.getWordId())
                            .word(word.getWord())
                            .mean(word.getMean())
                            .scrap(false)
                            .build())
                    .collect(Collectors.toList());

            return DictionaryWordListResponseDto.builder()
                    .page(requestDto.getPage() + 1)
                    .totalPage(getTotalPage(dictionaryRepository.findAll().size()))
                    .items(words)
                    .build();
        }
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

        long total = scrapWordRepository.findAllByWordId(word).stream().count();

        if (vocaId == 0L) {
            return WordDetailResponseDto.builder()
                    .word(word.getWord())
                    .mean(word.getMean())
                    .example(word.getExample())
                    .useYear(word.getUseYear())
                    .scrap(false)
                    .total(total)
                    .tags(wordTags)
                    .relProblem(relProblem)
                    .build();
        }

        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(vocaId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        return WordDetailResponseDto.builder()
                .word(word.getWord())
                .mean(word.getMean())
                .example(word.getExample())
                .useYear(word.getUseYear())
                .scrap(scrapWordRepository.existsByWordIdAndVocaId(word, vocabularyList))
                .total(total)
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
    public void unScrap(Long vocaId, Long wordId) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(vocaId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        Dictionary word = dictionaryRepository.findByWordId(wordId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        });

        ScrapWord scrapId = scrapWordRepository.findByWordIdAndVocaId(word, vocabularyList).get();

        scrapWordRepository.delete(scrapId);
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
        wordCreateRequestDto.getWordTags().add(createWord.getWord());

        // 태그 생성하면서 관계 연결 (단어 태그) -> 태그가 있는지 먼저 확인
        for (int i = 0; i < wordCreateRequestDto.getWordTags().size(); i++) {
            tagService.createTag(wordCreateRequestDto.getWordTags().get(i));
            tagService.relationWordTag(createWord,
                    tagRepository.findByTag(wordCreateRequestDto.getWordTags().get(i)).get());
        }

        List<String> wordTags = tagToWordRepository.findAllByWordId(createWord).stream()
                .map(tags -> tags.getTagId().getTag())
                .collect(Collectors.toList());

        return WordDetailResponseDto.builder()
                .word(createWord.getWord())
                .mean(createWord.getMean())
                .example(createWord.getExample())
                .useYear(createWord.getUseYear())
                .tags(wordTags)
                .build();
    }

    @Override
    @Transactional
    public void wordDelete(Long wordId, Member member) {
        if (!member.getMemberId().equals("test1234")) {
            throw new AuthenticationException(ErrorCode.DONT_AUTHENTICATION_ROLE);
        }

        Dictionary word = dictionaryRepository.findById(wordId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        });

        dictionaryRepository.delete(word);
    }

    @Override
    public Map<String, Long> todayWord() {
        Map<String, Long> result = new HashMap<>();
        List<Dictionary> word = dictionaryRepository.findAll();
        result.put(word.get(0).getWord(), word.get(0).getWordId());

        return result;
    }

    // 전체 페이지 수 구하기
    private int getTotalPage(long totalCount) {
        int totalPage = 0;
        totalPage = (int) (totalCount / 5);
        if (totalCount % 5 != 0) {
            totalPage++;
        }
        return totalPage;
    }
}
