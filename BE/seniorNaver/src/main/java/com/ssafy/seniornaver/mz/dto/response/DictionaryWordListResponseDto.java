package com.ssafy.seniornaver.mz.dto.response;

import com.ssafy.seniornaver.mz.entity.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class DictionaryWordListResponseDto {
    private Long wordId;
    private String word;
    private String mean;
    private List<Tag> tags;
    private boolean scrap;

    @Builder
    public DictionaryWordListResponseDto(Long wordId, String word, String mean,
                                         List<Tag> tags, boolean scrap) {
        this.wordId = wordId;
        this.word = word;
        this.mean = mean;
        this.tags = tags;
        this.scrap = scrap;
    }
}
