package com.ssafy.seniornaver.jobposting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.response.ErrorResponse;
import com.ssafy.seniornaver.jobposting.dto.request.JobListRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;
import com.ssafy.seniornaver.jobposting.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job/v1")
@RequiredArgsConstructor
public class JobServiceController {

    private final JobService jobService;

    @Operation(summary = "일자리 데이터 DB 저장 (수동)", description = "안할 경우 오전 8시마다 갱신, (데이터 1일 1회 갱신한대서 한번만 함)")
    @GetMapping("/resource")
    public ResponseEntity jobSearch() throws JsonProcessingException {

        jobService.saveWorkList();

        return ResponseEntity.ok("DB저장 완료");
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "502", description = "BAD_GATEWAY", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
            })
    @GetMapping("/post/detail/{id}")
    public ResponseEntity<JobDetailResponseDto> jobDetail(@PathVariable String id) throws JsonProcessingException {

        JobDetailResponseDto jobDetailResponseDto = jobService.getDetailService(id);

        return ResponseEntity.ok(jobDetailResponseDto);
    }
}
