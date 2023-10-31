package com.ssafy.seniornaver.location.service;

import com.ssafy.seniornaver.location.dto.RequestSearchDto;
import com.ssafy.seniornaver.location.dto.ResponseSearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{

    private final WebClient webClient;


    @Override
    public ResponseSearchDto keywordSearch(RequestSearchDto requestSearchDto) {
        try {
            StringBuilder urlBuilder = new StringBuilder("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode")
            String addr = URLEncoder.encode(requestSearchDto.getLocation(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    @Override
    public String imageSearch(String location) {
        return null;
    }
}
