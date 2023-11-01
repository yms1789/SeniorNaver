package com.ssafy.seniornaver.location.service;

import com.ssafy.seniornaver.location.dto.LoadImageData;
import com.ssafy.seniornaver.location.dto.LoadSearchData;
import com.ssafy.seniornaver.location.dto.request.RequestCategorySearchDto;
import com.ssafy.seniornaver.location.dto.request.RequestKeywordSearchDto;
import com.ssafy.seniornaver.location.dto.response.ResponseSearchDto;

public interface SearchService {
    ResponseSearchDto keywordSearch(RequestKeywordSearchDto requestSearchDto);
    ResponseSearchDto categorySearch(RequestCategorySearchDto requestSearchDto);
    LoadImageData imageSearch(String baseUrl, String keyword);
    LoadSearchData getData(String baseUrl, String keyword);
}
