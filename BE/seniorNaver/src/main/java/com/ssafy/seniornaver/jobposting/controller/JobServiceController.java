package com.ssafy.seniornaver.jobposting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.seniornaver.jobposting.dto.request.JobListRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;
import com.ssafy.seniornaver.jobposting.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job/v1")
@RequiredArgsConstructor
public class JobServiceController {

    private final JobService jobService;

    @GetMapping("/search")
    public ResponseEntity<JobListResponseDto> jobSearch(@RequestBody JobListRequestDto jobRequestDto) throws JsonProcessingException {

        JobListResponseDto jobListResponseDto = jobService.getWorkList(jobRequestDto);

        return ResponseEntity.ok(jobListResponseDto);
    }

    @GetMapping("/search/employ")
    public ResponseEntity<JobListResponseDto> jobEmploySearch(@RequestBody JobListRequestDto jobRequestDto) throws JsonProcessingException {

        JobListResponseDto jobListResponseDto = jobService.getEmployList(jobRequestDto);

        return ResponseEntity.ok(jobListResponseDto);
    }

    @GetMapping("/post/detail/{id}")
    public ResponseEntity<JobDetailResponseDto> jobDetail(@PathVariable String id) throws JsonProcessingException {

        JobDetailResponseDto jobDetailResponseDto = jobService.getDetailService(id);

        return ResponseEntity.ok(jobDetailResponseDto);
    }
}
