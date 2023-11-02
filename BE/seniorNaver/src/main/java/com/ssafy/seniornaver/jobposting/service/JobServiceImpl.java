package com.ssafy.seniornaver.jobposting.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.ssafy.seniornaver.jobposting.dto.request.JobRequestDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobDetailResponseDto;
import com.ssafy.seniornaver.jobposting.dto.response.JobListResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    @Value("${data.job.api-key}") private String apiKey;

    @Override
    public JobDetailResponseDto detailService(String jobId) {
        return null;
    }

    @Override
    public JobListResponseDto getList(JobRequestDto jobRequestDto) throws JsonProcessingException {
        JSONObject posts = xmlToJson(getListData(jobRequestDto));

        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);

        JobListResponseDto jobListResponseDto = objectMapper.readValue(posts.toString(), JobListResponseDto.class);
        jobListResponseDto.changeTotal(getTotalPage(jobListResponseDto.getTotalCount()));

        return jobListResponseDto;
    }

    @Override
    public JobListResponseDto getSearchList(JobRequestDto jobRequestDto) {

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

    public JSONObject xmlToJson(String xml) {
        try {
            JSONObject jsonObject = XML.toJSONObject(xml);
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            JSONObject body = jsonObject.getJSONObject("response").getJSONObject("body");

            return body;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public int getTotalPage(int totalCount) {
        int totalPage = 0;
        totalPage = totalCount / 16;
        if (totalCount % 16 != 0) {
            totalPage++;
        }
        return totalPage;
    }
}
