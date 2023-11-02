package com.ssafy.seniornaver.location.controller;

import com.ssafy.seniornaver.error.exception.DontSuchException;
import com.ssafy.seniornaver.location.dto.request.RequestCategorySearchDto;
import com.ssafy.seniornaver.location.dto.request.RequestKeywordSearchDto;
import com.ssafy.seniornaver.location.dto.response.ResponseSearchDto;
import com.ssafy.seniornaver.location.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search/v1")
public class PlaceSearchController {

    private final SearchService searchService;

    @GetMapping("/keyword")
    public ResponseEntity<ResponseSearchDto> keywordSearch(// HttpServletRequest httpServletRequest,
                                                        @RequestBody RequestKeywordSearchDto requestSearchDto) {

        ResponseSearchDto responseSearchDto = searchService.keywordSearch(requestSearchDto);

        return ResponseEntity.ok(responseSearchDto);
    }

    @GetMapping("/category")
    public ResponseEntity<ResponseSearchDto> categorySearch(// HttpServletRequest httpServletRequest,
                                                        @RequestBody RequestCategorySearchDto requestSearchDto) {

        ResponseSearchDto responseSearchDto = searchService.categorySearch(requestSearchDto);

        return ResponseEntity.ok(responseSearchDto);
    }
}
