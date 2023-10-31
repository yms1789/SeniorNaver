package com.ssafy.seniornaver.location.dto;

import lombok.Getter;

@Getter
public class RequestSearchDto {
    private String location;
    private String keyword;
    private String category;
}
