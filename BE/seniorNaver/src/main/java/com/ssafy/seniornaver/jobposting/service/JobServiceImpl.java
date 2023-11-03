package com.ssafy.seniornaver.jobposting.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.DontSuchException;
import com.ssafy.seniornaver.jobposting.dto.request.JobListRequestDto;
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

    /*
    * 상세검색 -> JobId로 상세내용 확인
    * */
    @Override
    public JobDetailResponseDto getDetailService(String jobId) throws JsonProcessingException {

        JSONObject post = xmlToJson(getDetailData(jobId)).getJSONObject("items").getJSONObject("item");
        JobDetailResponseDto jobDetailResponseDto = objectMapper.readValue(post.toString(), JobDetailResponseDto.class);
        updateJobDetail(jobDetailResponseDto);

        return jobDetailResponseDto;
    }

    /*
    *   근무지역 검색 기능 (기본 검색)
    * */
    @Override
    public JobListResponseDto getWorkList(JobListRequestDto jobRequestDto) throws JsonProcessingException {

        JSONObject posts = xmlToJson(getListData(jobRequestDto, 1));

        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);

        JobListResponseDto jobListResponseDto = objectMapper.readValue(posts.toString(), JobListResponseDto.class);
        jobListResponseDto.changeTotal(getTotalPage(jobListResponseDto.getTotalCount()));

        return jobListResponseDto;
    }

    /*
    *   근무지역 + 고용형태 검색 기능
    * */
    @Override
    public JobListResponseDto getEmployList(JobListRequestDto jobRequestDto) throws JsonProcessingException{
        JSONObject posts = xmlToJson(getListData(jobRequestDto, 2));

        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);

        JobListResponseDto jobListResponseDto = objectMapper.readValue(posts.toString(), JobListResponseDto.class);
        jobListResponseDto.changeTotal(getTotalPage(jobListResponseDto.getTotalCount()));

        return jobListResponseDto;
    }

    // 일자리 목록 데이터 불러오기
    @Override
    public String getListData(JobListRequestDto jobRequestDto, int searchNum) {

        // 기본 검색
        if (searchNum == 1) {
            return webClient.mutate()
                    .baseUrl("http://apis.data.go.kr/B552474/SenuriService/getJobList")
                    .build()
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("serviceKey", apiKey)
                            .queryParam("numOfRows", 16)
                            .queryParam("pageNo", jobRequestDto.getPageNum())
                            .queryParam("workPlcNm", jobRequestDto.getWorkPlcNm())
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        }

        // + 고용형태 검색
        if (searchNum == 2) {
            return webClient.mutate()
                    .baseUrl("http://apis.data.go.kr/B552474/SenuriService/getJobList")
                    .build()
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("serviceKey", apiKey)
                            .queryParam("numOfRows", 16)
                            .queryParam("pageNo", jobRequestDto.getPageNum())
                            .queryParam("workPlcNm", jobRequestDto.getWorkPlcNm())
                            .queryParam("emplymShp", jobRequestDto.getEmplymShp())
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        }

        // 존재하지 않는 검색 유형
        return "-1";
    }

    // 상세 정보 페이지
    @Override
    public String getDetailData(String jobId) {

        return webClient.mutate()
                .baseUrl("http://apis.data.go.kr/B552474/SenuriService/getJobInfo")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("serviceKey", apiKey)
                        .queryParam("id", jobId)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    private JSONObject xmlToJson(String xml) {
        if (xml.equals("-1")) {
            throw new DontSuchException(ErrorCode.DONT_SUCH_JOB_POST);
        }

        JSONObject jsonObject = XML.toJSONObject(xml);
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        JSONObject body = jsonObject.getJSONObject("response").getJSONObject("body");

        return body;
    }
    
    // 전체 페이지 수 구하기
    private int getTotalPage(int totalCount) {
        int totalPage = 0;
        totalPage = totalCount / 16;
        if (totalCount % 16 != 0) {
            totalPage++;
        }
        return totalPage;
    }

    private void updateJobDetail(JobDetailResponseDto jobDetailResponseDto) {
        String acpt = jobDetailResponseDto.getAcptMthdCd();

        if (acpt.equals("CM0801")) {
            acpt = "온라인";
        } else if (acpt.equals("CM0802")) {
            acpt = "이메일";
        } else if (acpt.equals("CM0803")) {
            acpt = "팩스";
        } else if (acpt.equals("CM0804")){
            acpt = "방문";
        }

        jobDetailResponseDto.updateAcptMthdCd(acpt);
        jobDetailResponseDto.getFrAcptDd().insert(4, "-").insert(7,"-");
        jobDetailResponseDto.getToAcptDd().insert(4, "-").insert(7,"-");
    }
}
