package com.ssafy.seniornaver.mz.dto.response;

import com.ssafy.seniornaver.mz.entity.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class DirectoryWordListResponseDto {
    private String word;
    private String mean;
    private String example;
    private List<Tag> tags;
    private boolean complete;

    @Builder
    public DirectoryWordListResponseDto(String word, String mean, String example,
                                        List<Tag> tags, boolean complete) {
        this.word = word;
        this.mean = mean;
        this.example = example;
        this.tags = tags;
        this.complete = complete;
    }
}
