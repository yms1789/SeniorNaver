package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
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
    private final MemberRepository memberRepository;

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
        memberRepository.save(member);
    }

    @Override
    public VocaListResponseDto getVocaList(Member member, VocaListRequestDto vocaListRequestDto) {

        vocabularyListRepository.findByVocaId(member.getVocaId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        log.info("category Num : {}", vocaListRequestDto.getCategory());

        Pageable pageable = PageRequest.of(vocaListRequestDto.getPage(), 5, Sort.by("word").ascending());

        // 스크랩 단어 리스트
        if (vocaListRequestDto.getCategory() == 1) {
            List<VocaListResponseDto.Item> wordList = scrapWordRepository.findAllByVocaId(member.getVocaId(), pageable).stream()
                    .map(scrapWord -> VocaListResponseDto.Item.builder()
                            .id(scrapWord.getWordId().getWordId())
                            .title(scrapWord.getWordId().getWord())
                            .content(scrapWord.getWordId().getMean())
                            .year(scrapWord.getWordId().getUseYear())
                            .build())
                    .collect(Collectors.toList());

            return VocaListResponseDto.builder()
                    .page(vocaListRequestDto.getPage() + 1)
                    .totalPage(getTotalPage(scrapWordRepository.findAllByVocaId(member.getVocaId()).stream().count()))
                    .items(wordList)
                    .build();
        }

        // 저장 문제 리스트
        if (vocaListRequestDto.getCategory() == 2) {
            List<VocaListResponseDto.Item> problemList = saveProblemRepository.findAllByVocaId(member.getVocaId(), pageable).stream()
                    .map(saveProblem -> VocaListResponseDto.Item.builder()
                            .id(saveProblem.getProblemId().getProblemId())
                            .title(saveProblem.getProblemId().getTitle())
                            .content(saveProblem.getProblemId().getProblemExplanation())
                            .year(saveProblem.getProblemId().getUseYear())
                            .build())
                    .collect(Collectors.toList());

            return VocaListResponseDto.builder()
                    .page(vocaListRequestDto.getPage() + 1)
                    .totalPage(getTotalPage(saveProblemRepository.findAllByVocaId(member.getVocaId()).stream().count()))
                    .items(problemList)
                    .build();
        }

        // 만든 문제 리스트
        if (vocaListRequestDto.getCategory() == 3) {
            List<VocaListResponseDto.Item> problemList = makeProblemRepository.findAllByVocaId(member.getVocaId(), pageable).stream()
                    .map(makeProblem -> VocaListResponseDto.Item.builder()
                            .id(makeProblem.getProblemId().getProblemId())
                            .title(makeProblem.getProblemId().getTitle())
                            .content(makeProblem.getProblemId().getProblemExplanation())
                            .year(makeProblem.getProblemId().getUseYear())
                            .build())
                    .collect(Collectors.toList());

            return VocaListResponseDto.builder()
                    .page(vocaListRequestDto.getPage() + 1)
                    .totalPage(getTotalPage(makeProblemRepository.findAllByVocaId(member.getVocaId()).stream().count()))
                    .items(problemList)
                    .build();
        }

        throw new BadRequestException(ErrorCode.NOT_MATCH_CATEGORY);
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
