package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.entity.SituationProblem;
import com.ssafy.seniornaver.mz.repository.DictionaryRepository;
import com.ssafy.seniornaver.mz.repository.SituationRepository;
import com.ssafy.seniornaver.mz.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class SituationProblemServiceImpl implements SituationProblemService{

    private final DictionaryRepository dictionaryRepository;
    private final SituationRepository situationRepository;
    private final TagRepository tagRepository;
    private final TagService tagService;

    @Override
    public boolean wordCheck(String word) {
        return dictionaryRepository.existsByWord(word);
    }

    @Override
    @Transactional
    public SituationProblem createProblem(ProblemCreateRequestDto problemCreateRequestDto,
                                          Member member) {
        if (situationRepository.existsByTitle(problemCreateRequestDto.getTitle())){
            throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_PROBLEM);
        }

        return situationRepository.saveAndFlush(SituationProblem.builder()
                        .title(problemCreateRequestDto.getTitle())
                        .review(problemCreateRequestDto.getReview())
                        .problemExplanation(problemCreateRequestDto.getProblemExplanation())
                        .answer(problemCreateRequestDto.getAnswer())
                        .makeMember(member.getMemberId())
                        .image(problemCreateRequestDto.getImage())
                        .useYear(problemCreateRequestDto.getUseYear())
                .build());
    }

    @Override
    public void relTagToProblem(SituationProblem situationProblem, ProblemCreateRequestDto problemCreateRequestDto) {
        // 태그 생성, 이미 있다면 return 하여 기존의 태그에 추가
        for (int i = 0; i < problemCreateRequestDto.getTags().size(); i++) {
            tagService.createTag(problemCreateRequestDto.getTags().get(i));
            tagService.relationProblemTag(situationProblem,
                    tagRepository.findByTag(problemCreateRequestDto.getTags().get(i)).get());
        }
    }
}
