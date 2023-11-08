package com.ssafy.seniornaver.curation.controller;

import com.ssafy.seniornaver.curation.dto.*;
import com.ssafy.seniornaver.curation.entity.Performance;
import com.ssafy.seniornaver.curation.service.NewsService;
import com.ssafy.seniornaver.curation.service.PerformanceService;
import com.ssafy.seniornaver.curation.service.TourDtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/curation")
public class CurationController {

    private final PerformanceService performanceService;
    private final TourDtService tourDtService;
    private final NewsService newsService;

    @Operation(summary = "요청날짜 기준 공연 시작일이 가까운 순으로 공연목록 전체 반환")
    @GetMapping("/performance")
    public ResponseEntity<List<PerformanceDto>> getPerformances() {
        List<PerformanceDto> performances = performanceService.getPerformancesNearDate();
        return ResponseEntity.ok(performances);
    }
    @Operation(summary = "요청날짜 기준 7일간 공연목록 조회 후 DB에 저장 *1시간에 한번씩 실행*")
    @GetMapping("/performance/save")
    public List<Performance> savePerformanceList() throws Exception {
        return performanceService.savePerformanceList();
    }

    @Operation(summary = "공연ID를 통해 공연 상세정보 조회")
    @GetMapping("/performance/{pfid}")
    public Mono<ResponseEntity<PerformanceDetailDto>> getPerformanceDetail(
            @PathVariable("pfid")
            @Parameter(description = "공연 ID", example = "PF12345")
            String pfid
    ) {
        return performanceService.getPerformanceDetail(pfid)
                .map(performanceDetailListDto -> {
                    if (performanceDetailListDto.getDb() != null && !performanceDetailListDto.getDb().isEmpty()) {
                        PerformanceDetailDto performanceDetailDto = performanceDetailListDto.getDb().get(0);
                        return ResponseEntity.ok(performanceDetailDto);
                    } else {
                        return ResponseEntity.notFound().build();
                    }
                });
    }

    @Operation(summary = "지역코드를 통해 해당 지역의 관광지 목록 조회")
    @GetMapping("/tourdt/{areaCode}")
    public ResponseEntity<List<TourDtDto>> getTourDts(
            @Parameter(description = "지역 코드 (1:서울, 2:인천, 3:대전, 4:대구, 5:광주, 6:부산, 7:울산, 8:세종특별자치시, 31:경기도, 32:강원특별자치도, 33:충청북도, 34:충청남도, 35:경상북도, 36:경상남도, 37:전라북도, 38:전라남도, 39:제주도)")
            @PathVariable int areaCode) {
        List<TourDtDto> tourDtList = tourDtService.getTourDtList(areaCode);
        return ResponseEntity.ok(tourDtList);
    }

    @Operation(summary = "관광지 ID를 통해 해당 관광지의 상세 정보 조회")
    @GetMapping("/tourdt/detail/{contentId}")
    public ResponseEntity<TourDtDetail> getTourDtDetail(
            @Parameter(description = "관광지 ID")
            @PathVariable int contentId) {
        TourDtDetail tourDtDetail = tourDtService.getTourDtDetail(contentId);
        return ResponseEntity.ok(tourDtDetail);
    }

    @Operation(summary = "키워드를 통해 뉴스 목록 조회")
    @GetMapping("/news/{keyword}")
    public ResponseEntity<List<NewsDto>> getNewsList(
            @Parameter(description = "키워드, ex : 정치, 금융, IT, 스포츠 등 카테고리 입력")
            @PathVariable String keyword) {
        List<NewsDto> newsList = newsService.getNewsList(keyword);
        return ResponseEntity.ok(newsList);
    }

}
