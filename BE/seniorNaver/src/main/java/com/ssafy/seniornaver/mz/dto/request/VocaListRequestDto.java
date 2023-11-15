package com.ssafy.seniornaver.mz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VocaListRequestDto {
    private int page;
    private int category;
}
