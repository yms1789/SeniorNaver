package com.ssafy.seniornaver.mz.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DictionaryWordListRequestDto {
    private int page;
    private String keyword;
    private String tag;
}
