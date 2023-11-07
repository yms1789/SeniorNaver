package com.ssafy.seniornaver.mz.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class WordCreateRequestDto {
    private String word;
    private String mean;
    private String example;
    private int year;
    private List<String> tag;
}
