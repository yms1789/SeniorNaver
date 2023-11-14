package com.ssafy.seniornaver.mz.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DictionaryWordListRequestDto {
    private int page;
    private String keyword;
}
