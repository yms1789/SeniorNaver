package com.ssafy.seniornaver.location.controller;

import com.ssafy.seniornaver.error.response.ErrorResponse;
import com.ssafy.seniornaver.location.dto.request.RequestCategorySearchDto;
import com.ssafy.seniornaver.location.dto.request.RequestKeywordSearchDto;
import com.ssafy.seniornaver.location.dto.response.ResponseSearchDto;
import com.ssafy.seniornaver.location.service.SearchService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search/v1")
public class PlaceSearchController {

    private final SearchService searchService;

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD_REQUEST", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/keyword")
    public ResponseEntity<ResponseSearchDto> keywordSearch(// HttpServletRequest httpServletRequest,
                                                        RequestKeywordSearchDto requestSearchDto) {

        ResponseSearchDto responseSearchDto = searchService.keywordSearch(requestSearchDto);

        return ResponseEntity.ok(responseSearchDto);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD_REQUEST", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/category")
    public ResponseEntity<ResponseSearchDto> categorySearch(// HttpServletRequest httpServletRequest,
                                                        RequestCategorySearchDto requestSearchDto) {

        ResponseSearchDto responseSearchDto = searchService.categorySearch(requestSearchDto);

        return ResponseEntity.ok(responseSearchDto);
    }
}
