package com.ssafy.seniornaver.mz.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemCreateRequestDto{
    private String title;
    private String image;
    private int answer;
    private String review;
    private String problemExplanation;
    private int uesYear;
}
