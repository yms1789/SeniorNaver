package com.ssafy.seniornaver.location.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RequestSearchDto {
    private String location;
    private String keyword;
}
