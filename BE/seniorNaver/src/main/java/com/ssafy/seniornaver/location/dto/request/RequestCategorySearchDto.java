package com.ssafy.seniornaver.location.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RequestCategorySearchDto {
    private String location;
    private String category;
}
