package com.ssafy.seniornaver.location.service;

import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.DontSuchException;
import com.ssafy.seniornaver.location.dto.LoadImageData;
import com.ssafy.seniornaver.location.dto.LoadSearchData;
import com.ssafy.seniornaver.location.dto.request.RequestCategorySearchDto;
import com.ssafy.seniornaver.location.dto.request.RequestKeywordSearchDto;
import com.ssafy.seniornaver.location.dto.response.ResponseSearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.StringTokenizer;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceSearchServiceImpl implements PlaceSearchService {

    private final WebClient webClient;
    @Value("${naver.developer.client.id}") private String clientId;
    @Value("${naver.developer.client.secret}") private String clientSecret;

    static String keywordUri = "https://openapi.naver.com/v1/search/local.json";
    static String imageUri = "https://openapi.naver.com/v1/search/image";

    @Override
    public ResponseSearchDto keywordSearch(RequestKeywordSearchDto requestSearchDto) {
        StringBuilder searchForm = new StringBuilder();

        LoadSearchData searchData = getData(keywordUri, requestSearchDto.getKeyword());
        updateSearchData(searchData);
        List<ResponseSearchDto.Item> responseData = new ArrayList<>();

        for (int i = 0; i < searchData.getItems().size(); i++) {
            LoadSearchData.Item place = searchData.getItems().get(i);
            searchForm.append(requestSearchDto.getKeyword()).append(" ")
                    .append(place.getTitle()).append(" ")
                    .append(place.getCategory()).append(" ");

            log.info("이미지 검색어 : {}", searchForm);

            String imageData;
            try {
                imageData = imageSearch(imageUri, searchForm.toString()).getItems().get(0).getThumbnail();
            } catch (IndexOutOfBoundsException e) {
                imageData = "";
            }

            responseData.add(ResponseSearchDto.Item.builder()
                            .shopName(place.getTitle())
                            .category(place.getCategory())
                            .shopLocation(place.getRoadAddress())
                            .mapX(place.getMapx().insert(3,"."))
                            .mapY(place.getMapy().insert(2,"."))
                            .thumbnail(imageData)
                    .build());

            searchForm.setLength(0);
        }
        return ResponseSearchDto.builder()
                .items(responseData)
                .build();
    }

    @Override
    public ResponseSearchDto categorySearch(RequestCategorySearchDto requestSearchDto) {
        StringBuilder searchForm = new StringBuilder();

        try {
            if (!requestSearchDto.getLocation().equals("")) {
                StringTokenizer stringTokenizer = new StringTokenizer(requestSearchDto.getLocation());
                searchForm.append(stringTokenizer.nextToken()).append(" ")
                        .append(stringTokenizer.nextToken()).append(" ")
                        .append(stringTokenizer.nextToken()).append(" ");
            }
        } catch (NoSuchElementException e) {
            throw new DontSuchException(ErrorCode.DONT_SUCH_PLACE);
        }

        String region = searchForm.toString();

        searchForm.append(requestSearchDto.getCategory());

        log.info("검색어 : {}", searchForm.toString());

        LoadSearchData searchData = getData(keywordUri, searchForm.toString());
        updateSearchData(searchData);
        List<ResponseSearchDto.Item> responseData = new ArrayList<>();

        for (int i = 0; i < searchData.getItems().size(); i++) {
            searchForm.setLength(0);

            LoadSearchData.Item place = searchData.getItems().get(i);
            searchForm.append(region).append(place.getTitle()).append(" ")
                    .append(place.getCategory()).append(" ");

            log.info("이미지 검색어 : {}", searchForm);

            String imageData;
            try {
                imageData = imageSearch(imageUri, searchForm.toString()).getItems().get(0).getThumbnail();
            } catch (IndexOutOfBoundsException e) {
                imageData = "";
            }

            responseData.add(ResponseSearchDto.Item.builder()
                    .shopName(place.getTitle())
                    .category(place.getCategory())
                    .shopLocation(place.getRoadAddress())
                    .mapX(place.getMapx().insert(3,"."))
                    .mapY(place.getMapy().insert(2,"."))
                    .thumbnail(imageData)
                    .build());
        }

        return ResponseSearchDto.builder()
                .items(responseData)
                .build();
    }

    @Override
    public LoadImageData imageSearch(String baseUrl, String keyword) {

        HttpHeaders Headers = new HttpHeaders();
        Headers.add("X-Naver-Client-Id", clientId);
        Headers.add("X-Naver-Client-Secret", clientSecret);

        return webClient.mutate()
                .baseUrl(baseUrl)
                .defaultHeaders(httpHeaders -> httpHeaders.addAll(Headers))
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("query", keyword)
                        .queryParam("display", 1)
                        .build())
                .retrieve()
                .bodyToMono(LoadImageData.class)
                .block();
    }

    @Override
    public LoadSearchData getData(String baseUrl, String keyword) {

        HttpHeaders Headers = new HttpHeaders();
        Headers.add("X-Naver-Client-Id", clientId);
        Headers.add("X-Naver-Client-Secret", clientSecret);

        return webClient.mutate()
                .baseUrl(baseUrl)
                .defaultHeaders(httpHeaders -> httpHeaders.addAll(Headers))
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("query", keyword)
                        .queryParam("display", 5)
                        .queryParam("sort", "random")
                        .build())
                .retrieve()
                .bodyToMono(LoadSearchData.class)
                .block();
    }

    private void updateSearchData(LoadSearchData loadSearchData) {
        for (int i = 0; i < loadSearchData.getItems().size(); i++) {
            String categoryValue = loadSearchData.getItems().get(i).getCategory();
            while (categoryValue.contains(">")) {
                categoryValue = categoryValue.substring(categoryValue.indexOf('>') + 1);
            }

            loadSearchData.getItems().get(i).updateCategory(categoryValue);

            String titleValue = loadSearchData.getItems().get(i).getTitle();
            if (titleValue.contains("<b>") || titleValue.contains("</b>")) {
                titleValue = titleValue.replace("<b>", "");
                titleValue = titleValue.replace("</b>", "");
            }
            loadSearchData.getItems().get(i).updateTitle(titleValue);
        }
    }

    private String mapReplace(String map, int idx) {
        StringBuffer sb = new StringBuffer();

        sb.append(map);
        sb.insert(idx, ".");

        return sb.toString();
    }
}
