package com.ssafy.seniornaver.jobposting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.response.ErrorResponse;
import com.ssafy.seniornaver.jobposting.dto.request.JobListRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;
import com.ssafy.seniornaver.jobposting.service.JobService;
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

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(responseCode = "400", description = "BAD_REQUEST", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        })
    @GetMapping("/search")
    public ResponseEntity<JobListResponseDto> jobSearch(JobListRequestDto jobRequestDto) throws JsonProcessingException {

        JobListResponseDto jobListResponseDto = jobService.getWorkList(jobRequestDto);

        return ResponseEntity.ok(jobListResponseDto);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD_REQUEST", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/search/employ")
    public ResponseEntity<JobListResponseDto> jobEmploySearch(JobListRequestDto jobRequestDto) throws JsonProcessingException {

        JobListResponseDto jobListResponseDto = jobService.getEmployList(jobRequestDto);

        return ResponseEntity.ok(jobListResponseDto);
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
