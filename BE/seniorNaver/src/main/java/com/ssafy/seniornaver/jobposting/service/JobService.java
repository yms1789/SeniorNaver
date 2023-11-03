package com.ssafy.seniornaver.jobposting.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.seniornaver.jobposting.dto.request.JobListRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;

public interface JobService {
    JobDetailResponseDto getDetailService(String jobId) throws JsonProcessingException;
    JobListResponseDto getWorkList(JobListRequestDto jobRequestDto) throws JsonProcessingException;
    JobListResponseDto getEmployList(JobListRequestDto jobRequestDto) throws JsonProcessingException;
    String getListData(JobListRequestDto jobRequestDto, int searchNum);
    String getDetailData(String jobId);
}
