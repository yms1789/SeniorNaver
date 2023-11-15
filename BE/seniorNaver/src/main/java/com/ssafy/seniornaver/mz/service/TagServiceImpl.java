package com.ssafy.seniornaver.mz.service;

import com.ssafy.seniornaver.mz.dto.request.DictionaryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
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
            return;
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
        problemId.getTags().add(tagToProblemRepository.save(TagToProblem.builder()
                .tagId(tag)
                .problemId(problemId)
                .build()));
    }

    @Override
    public DictionaryWordListResponseDto tagSearch(DictionaryWordListRequestDto dictionaryWordListRequestDto) {

        return null;
    }

    // 태그 검색
//            List<Tag> tags = tagRepository.findAllByTagContaining(requestDto.getKeyword());
//            for (int i = 0; i < tags.size(); i++) {
//                tagToWordRepository.findAllByTagId(tags.get(i)).stream()
//                        .map(tagToWord -> words.add(DictionaryWordListResponseDto.Item.builder()
//                                        .wordId(tagToWord.getWordId().getWordId())
//                                        .year(tagToWord.getWordId().getUseYear())
//                                        .mean(tagToWord.getWordId().getMean())
//                                        .word(tagToWord.getWordId().getWord())
//                                        .scrap(scrapWordRepository.findAllByVocaId(vocabularyList.getVocaId()).stream()
//                                                .anyMatch(scrapWord -> scrapWord.getWordId().getWordId() == tagToWord.getWordId().getWordId()))
//                                .build()));
//            }


//            List<Tag> tags = tagRepository.findAllByTagContaining(requestDto.getKeyword());
//            for (int i = 0; i < tags.size(); i++) {
//                tagToWordRepository.findAllByTagId(tags.get(i)).stream()
//                        .map(tagToWord -> words.add(DictionaryWordListResponseDto.Item.builder()
//                                .wordId(tagToWord.getWordId().getWordId())
//                                .year(tagToWord.getWordId().getUseYear())
//                                .mean(tagToWord.getWordId().getMean())
//                                .word(tagToWord.getWordId().getWord())
//                                .scrap(false)
//                                .build()));
//            }
}
