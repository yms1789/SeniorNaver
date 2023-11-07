package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.VocaListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.VocaListResponseDto;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import com.ssafy.seniornaver.mz.repository.MakeProblemRepository;
import com.ssafy.seniornaver.mz.repository.SaveProblemRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VocabularyListServiceImpl implements VocabularyListService{

    private final VocabularyListRepository vocabularyListRepository;
    private final ScrapWordRepository scrapWordRepository;
    private final SaveProblemRepository saveProblemRepository;
    private final MakeProblemRepository makeProblemRepository;

    @Override
    @Transactional
    public void createVocaList(Member member) {
        Optional<VocabularyList> vocabularyList = vocabularyListRepository.findByMemberId(member.getId());
        if (vocabularyList.isPresent()) {
            throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_VOCA_LIST);
        }

        VocabularyList vocaList = VocabularyList.builder()
                .memberId(member.getId())
                .build();

        vocabularyListRepository.saveAndFlush(vocaList);
        member.createVocaId(vocaList.getVocaId());
    }

    @Override
    public List<VocaListResponseDto> getScrapWordList(Member member, VocaListRequestDto vocaListRequestDto) {

        if (member.getVocaId() == null) {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        }

        Pageable pageable = PageRequest.of(vocaListRequestDto.getPage(), 10, Sort.by("word").ascending());

        // 스크랩 단어 리스트
        if (vocaListRequestDto.getCategory() == 1) {
            List<VocaListResponseDto> wordList = scrapWordRepository.findAllByVocaId(pageable, member.getVocaId()).stream()
                    .map(scrapWord -> VocaListResponseDto.builder()
                            .wordId(scrapWord.getWordId().getWordId())
                            .word(scrapWord.getWordId().getWord())
                            .year(scrapWord.getWordId().getUseYear())
                            .build())
                    .collect(Collectors.toList());

            return wordList;
        }

        // 저장 문제 리스트
        if (vocaListRequestDto.getCategory() == 2) {
            List<VocaListResponseDto> problemList = saveProblemRepository.findAllByVocaId(pageable, member.getVocaId()).stream()
                    .map(scrapWord -> VocaListResponseDto.builder()
                            .wordId(scrapWord.getWordId().getWordId())
                            .word(scrapWord.getWordId().getWord())
                            .year(scrapWord.getWordId().getUseYear())
                            .build())
                    .collect(Collectors.toList());

            return problemList;

        }

        // 만든 문제 리스트
        if (vocaListRequestDto.getCategory() == 3) {
            List<VocaListResponseDto> problemList = makeProblemRepository.findAllByVocaId(pageable, member.getVocaId()).stream()
                    .map(scrapWord -> VocaListResponseDto.builder()
                            .wordId(scrapWord.getWordId().getWordId())
                            .word(scrapWord.getWordId().getWord())
                            .year(scrapWord.getWordId().getUseYear())
                            .build())
                    .collect(Collectors.toList());

            return problemList;
        }

        throw new BadRequestException(ErrorCode.NOT_MATCH_CATEGORY);
    }
}
