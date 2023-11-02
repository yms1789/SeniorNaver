package com.ssafy.seniornaver.jobposting.controller;

import com.ssafy.seniornaver.jobposting.dto.request.JobRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;
import com.ssafy.seniornaver.jobposting.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/job/v1")
@RequiredArgsConstructor
public class JobServiceController {

    private final JobService jobService;

    @GetMapping("/search")
    public ResponseEntity<JobListResponseDto> jobSearch(JobRequestDto jobRequestDto) {

        JobListResponseDto jobListResponseDto = jobService.getList(jobRequestDto);

        return ResponseEntity.ok(jobListResponseDto);
    }
}
