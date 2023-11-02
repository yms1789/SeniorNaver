package com.ssafy.seniornaver.jobposting.service;

import com.ssafy.seniornaver.jobposting.dto.request.JobRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;
import com.ssafy.seniornaver.location.dto.LoadImageData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final WebClient webClient;
    @Value("${data.job.api-key}") private String apiKey;

    @Override
    public JobDetailResponseDto detailService(String jobId) {
        return null;
    }

    @Override
    public JobListResponseDto getList(JobRequestDto jobRequestDto) {
        String result = getListData(jobRequestDto);

        System.out.println(result);

        return null;
    }

    @Override
    public String getListData(JobRequestDto jobRequestDto) {

        return webClient.mutate()
                .baseUrl("http://apis.data.go.kr/B552474/SenuriService/getJobList")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("serviceKey", apiKey)
                        .queryParam("numOfRows", 16)
                        .queryParam("pageNo", jobRequestDto.getPageNum())
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
