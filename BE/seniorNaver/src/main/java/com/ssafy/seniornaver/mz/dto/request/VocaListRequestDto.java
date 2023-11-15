package com.ssafy.seniornaver.mz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class VocaListRequestDto {
    private int page;
    private int category;
}
