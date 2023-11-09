package com.ssafy.seniornaver.jobposting.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.seniornaver.jobposting.dto.request.JobListRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;

public interface JobService {
    JobDetailResponseDto getDetailService(String jobId) throws JsonProcessingException;
    void saveWorkList() throws JsonProcessingException;
    String getListData(int pageNo);
    String getDetailData(String jobId);
}
