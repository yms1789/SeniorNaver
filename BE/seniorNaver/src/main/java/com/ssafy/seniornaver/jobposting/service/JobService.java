package com.ssafy.seniornaver.jobposting.service;

import com.ssafy.seniornaver.jobposting.dto.request.JobRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;

public interface JobService {
    JobDetailResponseDto detailService(String jobId);
    JobListResponseDto getList(JobRequestDto jobRequestDto);
    String getListData(JobRequestDto jobRequestDto);
}
