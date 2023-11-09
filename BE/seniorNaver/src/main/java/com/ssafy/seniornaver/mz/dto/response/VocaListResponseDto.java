package com.ssafy.seniornaver.mz.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VocaListResponseDto {
    private Long wordId;
    private String word;
    private int year;

    @Builder
    public VocaListResponseDto(Long wordId, String word, int year) {
        this.wordId = wordId;
        this.word = word;
        this.year = year;
    }
}
