package com.ssafy.seniornaver.mz.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VocaListResponseDto {
    private Long id;
    private String title;
    private String content;
    private int year;

    @Builder
    public VocaListResponseDto(Long id, String title, String content, int year) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.year = year;
    }
}
