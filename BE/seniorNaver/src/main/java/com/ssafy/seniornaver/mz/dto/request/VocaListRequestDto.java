package com.ssafy.seniornaver.mz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VocaListRequestDto {
    private int page;
    private int category;
}
