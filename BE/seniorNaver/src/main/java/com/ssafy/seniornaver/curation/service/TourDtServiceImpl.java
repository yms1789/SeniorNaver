package com.ssafy.seniornaver.curation.service;

import com.ssafy.seniornaver.curation.dto.TourApiResponse;
import com.ssafy.seniornaver.curation.dto.TourDtDetail;
import com.ssafy.seniornaver.curation.dto.TourDtDetailResponse;
import com.ssafy.seniornaver.curation.dto.TourDtDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourDtServiceImpl implements TourDtService{

    @Value("${tour-api.serviceKey}")
    private String serviceKey;

    private final WebClient webClient;

    public List<TourDtDto> getTourDtList(int areaCode) {
        String url = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=" + serviceKey +
                "&numOfRows=1000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentTypeId=12&areaCode="+ areaCode + "&_type=json&arrange=O";

        Mono<List<TourDtDto>> mono = this.webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(TourApiResponse.class)
                .map(tourApiResponse -> tourApiResponse.getResponse().getBody().getItems().getItem())
                // firstimage가 null이거나 비어있는 경우 제외
                .map(list -> list.stream()
                        .filter(item -> item.getFirstimage() != null && !item.getFirstimage().isEmpty())
                        .collect(Collectors.toList()));

        List<TourDtDto> tourDtList = mono.block();
        return tourDtList;
    }

    public TourDtDetail getTourDtDetail(int contendId){
        String url = "http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" + serviceKey + "&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId="+ contendId +"&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y";

        return this.webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(TourDtDetailResponse.class)
                .map(tourDtDetailResponse -> tourDtDetailResponse.getResponse().getBody().getItems().getItem().get(0))
                .block();
    }
}
