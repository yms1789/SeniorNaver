package com.ssafy.seniornaver.location.service;

import com.ssafy.seniornaver.location.dto.RequestSearchDto;
import com.ssafy.seniornaver.location.dto.ResponseSearchDto;

public interface SearchService {
    ResponseSearchDto keywordSearch(RequestSearchDto requestSearchDto);
    String imageSearch(String location);
}
