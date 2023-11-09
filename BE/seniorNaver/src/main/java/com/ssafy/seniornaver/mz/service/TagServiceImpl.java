package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.entity.*;
import com.ssafy.seniornaver.mz.repository.TagRepository;
import com.ssafy.seniornaver.mz.repository.TagToProblemRepository;
import com.ssafy.seniornaver.mz.repository.TagToWordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

    private final TagRepository tagRepository;
    private final TagToWordRepository tagToWordRepository;
    private final TagToProblemRepository tagToProblemRepository;

    @Override
    @Transactional
    public void createTag(String word) {
        Optional<Tag> tag = tagRepository.findByTag(word);

        if (tag.isPresent()) {
            throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_DATA);
        }

        tagRepository.saveAndFlush(Tag.builder()
                        .tag(word)
                        .build());
    }

    @Override
    public void relationWordTag(Dictionary wordId, Tag tag) {
        tagToWordRepository.save(TagToWord.builder()
                        .tagId(tag)
                        .wordId(wordId)
                .build());
    }

    @Override
    public void relationProblemTag(SituationProblem problemId, Tag tag) {
        tagToProblemRepository.save(TagToProblem.builder()
                        .tagId(tag)
                        .problemId(problemId)
                .build());
    }
}
