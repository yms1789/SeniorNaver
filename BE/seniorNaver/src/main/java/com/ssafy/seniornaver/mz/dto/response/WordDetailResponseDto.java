package com.ssafy.seniornaver.mz.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class WordDetailResponseDto {
    private String word;
    private String mean;
    private String example;
    private Integer useYear;
    private List<String> tags;
    private List<Map<String, Long>> relProblem;

    @Builder
    public WordDetailResponseDto(String word, String mean, String example, Integer useYear,
                                 List<String> tags, List<Map<String, Long>> relProblem) {

        this.word = word;
        this.mean = mean;
        this.example = example;
        this. useYear = useYear;
        this.tags = tags;
        this.relProblem = relProblem;
    }
}
