package com.ssafy.seniornaver.location.controller;

import com.ssafy.seniornaver.location.dto.request.RequestCategorySearchDto;
import com.ssafy.seniornaver.location.dto.request.RequestKeywordSearchDto;
import com.ssafy.seniornaver.location.dto.response.ResponseSearchDto;
import com.ssafy.seniornaver.location.service.PlaceSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "PlaceSearch", description = "장소 검색 (맛집, 휴양지, ???)")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search/v1")
public class PlaceSearchController {

    private final PlaceSearchService searchService;

    @Operation(summary = "키워드 검색", description = "키워드를 통해 검색합니다.")
    @GetMapping("/keyword")
    public ResponseEntity<ResponseSearchDto> keywordSearch(// HttpServletRequest httpServletRequest,
                                                        RequestKeywordSearchDto requestSearchDto) {

        ResponseSearchDto responseSearchDto = searchService.keywordSearch(requestSearchDto);

        return ResponseEntity.ok(responseSearchDto);
    }

    @Operation(summary = "카테고리 검색", description = "자신의 지역기반으로 검색합니다.")
    @GetMapping("/category")
    public ResponseEntity<ResponseSearchDto> categorySearch(// HttpServletRequest httpServletRequest,
                                                        RequestCategorySearchDto requestSearchDto) {

        ResponseSearchDto responseSearchDto = searchService.categorySearch(requestSearchDto);

        return ResponseEntity.ok(responseSearchDto);
    }
}
