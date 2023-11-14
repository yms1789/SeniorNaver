package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.request.ProblemListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.ProblemDetailResponseDto;
import com.ssafy.seniornaver.mz.dto.response.ProblemListResponseDto;
import com.ssafy.seniornaver.mz.entity.Choice;
import com.ssafy.seniornaver.mz.entity.SituationProblem;
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

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SituationProblemServiceImpl implements SituationProblemService{

    private final DictionaryRepository dictionaryRepository;
    private final SituationRepository situationRepository;
    private final CompleteProblemRepository completeProblemRepository;
    private final VocabularyListRepository vocabularyListRepository;
    private final SaveProblemRepository saveProblemRepository;
    private final ChoiceRepository choiceRepository;

    private final TagRepository tagRepository;
    private final TagService tagService;
    private final TagToProblemRepository tagToProblemRepository;

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

        SituationProblem situationProblem =  situationRepository.saveAndFlush(SituationProblem.builder()
                        .title(problemCreateRequestDto.getTitle())
                        .review(problemCreateRequestDto.getReview())
                        .problemExplanation(problemCreateRequestDto.getProblemExplanation())
                        .answer(problemCreateRequestDto.getAnswer())
                        .makeMember(member.getMemberId())
                        .image(problemCreateRequestDto.getImage())
                        .useYear(problemCreateRequestDto.getUseYear())
                .build());

        for (int i = 0; i < problemCreateRequestDto.getChoices().size(); i++) {
            Choice choice = Choice.builder()
                    .content(problemCreateRequestDto.getChoices().get(i).getContent())
                    .choiceNum(problemCreateRequestDto.getChoices().get(i).getChoiceNum())
                    .situationProblem(situationProblem)
                    .build();

            choiceRepository.saveAndFlush(choice);
            situationProblem.getChoiceList().add(choice);
        }

        return situationProblem;
    }

    @Override
    public void relTagToProblem(SituationProblem situationProblem, ProblemCreateRequestDto problemCreateRequestDto) {
        // 태그 생성, 이미 있다면 return 하여 기존의 태그에 추가
        for (int i = 0; i < problemCreateRequestDto.getTags().size(); i++) {
            log.info("크기 : {}", problemCreateRequestDto.getTags().size());
            tagService.createTag(problemCreateRequestDto.getTags().get(i));
            tagService.relationProblemTag(situationProblem,
                    tagRepository.findByTag(problemCreateRequestDto.getTags().get(i)).get());
        }
    }

    @Override
    public List<ProblemListResponseDto> getMemberProblemList(ProblemListRequestDto problemListRequestDto, Member member) {
        VocabularyList vocabularyList = vocabularyListRepository.findByVocaId(member.getVocaId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        Pageable pageable = PageRequest.of(problemListRequestDto.getPage(), 5, Sort.by("title").ascending());

        // 키워드 검색시
        if (problemListRequestDto.getKeyword() != null) {
            Set<ProblemListResponseDto> problems = situationRepository.findAllByTitleContaining(problemListRequestDto.getKeyword(), pageable).stream()
                    .map(problem -> ProblemListResponseDto.builder()
                            .problemId(problem.getProblemId())
                            .title(problem.getTitle())
                            .problemExplanation(problem.getProblemExplanation())
                            .save(saveProblemRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                    .anyMatch(saveProblem -> saveProblem.getProblemId().getProblemId() == problem.getProblemId()))
                            .useYear(problem.getUseYear())
                            .complete(completeProblemRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                    .anyMatch(completeProblem -> completeProblem.getProblemId().getProblemId() == problem.getProblemId()))
                            .build())
                    .collect(Collectors.toSet());

            List<Tag> tags = tagRepository.findAllByTagContaining(problemListRequestDto.getKeyword());
            for (int i = 0; i < tags.size(); i++) {
                tagToProblemRepository.findAllByTagId(tags.get(i)).stream()
                        .map(tagToProblem -> problems.add(ProblemListResponseDto.builder()
                                        .problemId(tagToProblem.getProblemId().getProblemId())
                                        .title(tagToProblem.getProblemId().getTitle())
                                        .complete(completeProblemRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                                .anyMatch(completeProblem -> completeProblem.getProblemId().getProblemId() == tagToProblem.getProblemId().getProblemId()))
                                        .problemExplanation(tagToProblem.getProblemId().getProblemExplanation())
                                        .useYear(tagToProblem.getProblemId().getUseYear())
                                        .save(saveProblemRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                                .anyMatch(saveProblem -> saveProblem.getProblemId().getProblemId() == tagToProblem.getProblemId().getProblemId()))
                                .build()));
            }

            return List.copyOf(problems);

        } else {
            List<ProblemListResponseDto> problems = situationRepository.findAll(pageable).stream()
                    .map(problem -> ProblemListResponseDto.builder()
                            .problemId(problem.getProblemId())
                            .title(problem.getTitle())
                            .problemExplanation(problem.getProblemExplanation())
                            .save(saveProblemRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                    .anyMatch(saveProblem -> saveProblem.getProblemId().getProblemId() == problem.getProblemId()))
                            .useYear(problem.getUseYear())
                            .complete(completeProblemRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
                                    .anyMatch(completeProblem -> completeProblem.getProblemId().getProblemId() == problem.getProblemId()))
                            .build()).collect(Collectors.toList());

            return problems;
        }
    }

    @Override
    public List<ProblemListResponseDto> getProblemList(ProblemListRequestDto problemListRequestDto) {
        Pageable pageable = PageRequest.of(problemListRequestDto.getPage(), 5, Sort.by("title").ascending());

        // 키워드 검색시
        if (problemListRequestDto.getKeyword() != null) {
            Set<ProblemListResponseDto> problems = situationRepository.findAllByTitleContaining(problemListRequestDto.getKeyword(), pageable).stream()
                    .map(problem -> ProblemListResponseDto.builder()
                            .problemId(problem.getProblemId())
                            .title(problem.getTitle())
                            .problemExplanation(problem.getProblemExplanation())
                            .save(false)
                            .useYear(problem.getUseYear())
                            .complete(false)
                            .build())
                    .collect(Collectors.toSet());

            List<Tag> tags = tagRepository.findAllByTagContaining(problemListRequestDto.getKeyword());
            for (int i = 0; i < tags.size(); i++) {
                tagToProblemRepository.findAllByTagId(tags.get(i)).stream()
                        .map(tagToProblem -> problems.add(ProblemListResponseDto.builder()
                                .problemId(tagToProblem.getProblemId().getProblemId())
                                .title(tagToProblem.getProblemId().getTitle())
                                .complete(false)
                                .problemExplanation(tagToProblem.getProblemId().getProblemExplanation())
                                .useYear(tagToProblem.getProblemId().getUseYear())
                                .save(false)
                                .build()));
            }

            return List.copyOf(problems);

        } else {
            List<ProblemListResponseDto> problems = situationRepository.findAll(pageable).stream()
                    .map(problem -> ProblemListResponseDto.builder()
                            .problemId(problem.getProblemId())
                            .title(problem.getTitle())
                            .problemExplanation(problem.getProblemExplanation())
                            .save(false)
                            .useYear(problem.getUseYear())
                            .complete(false)
                            .build()).collect(Collectors.toList());

            return problems;
        }
    }

    @Override
    public ProblemDetailResponseDto getProblemDetail(Long problemId) {
        return null;
    }
}
