package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.TagCreateRequest;
import com.ssafy.seniornaver.mz.entity.Tag;
import com.ssafy.seniornaver.mz.repository.TagRepository;
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

    @Override
    @Transactional
    public void createTag(TagCreateRequest tagCreateRequest) {
        Optional<Tag> tag = tagRepository.findByTag(tagCreateRequest.getTag());

        if (tag.isPresent()) {
            throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_DATA);
        }

        tagRepository.save(Tag.builder()
                        .tag(tagCreateRequest.getTag())
                        .build());
    }
}
