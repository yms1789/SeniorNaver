package com.ssafy.seniornaver.mz.dto.response;

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
    private int year;
    private boolean scrap;

    @Builder
    public DictionaryWordListResponseDto(Long wordId, String word, String mean,
                                         int year, boolean scrap) {
        this.wordId = wordId;
        this.word = word;
        this.mean = mean;
        this.year = year;
        this.scrap = scrap;
    }
}
