package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.response.VocaListResponseDto;
import com.ssafy.seniornaver.mz.entity.VocabularyList;
import com.ssafy.seniornaver.mz.repository.VocabularyListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class VocabularyListServiceImpl implements VocabularyListService{

    private final VocabularyListRepository vocabularyListRepository;

    @Override
    public VocaListResponseDto getVocaList(Member member) {
        VocabularyList vocabularyList = vocabularyListRepository.findByMemberId(member.getId()).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXIST_VOCA_LIST);
        });

        return VocaListResponseDto.builder()
                .memberId(vocabularyList.getMemberId())
                .build();
    }

    @Override
    @Transactional
    public void createVocaList(Member member) {
        Optional<VocabularyList> vocabularyList = vocabularyListRepository.findByMemberId(member.getId());
        if (vocabularyList.isPresent()) {
            throw new BadRequestException(ErrorCode.ALREADY_REGISTERED_VOCA_LIST);
        }

        vocabularyListRepository.save(VocabularyList.builder()
                        .memberId(member.getId())
                        .build());
    }
}
