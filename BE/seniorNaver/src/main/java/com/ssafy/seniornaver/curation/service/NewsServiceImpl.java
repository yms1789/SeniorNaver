package com.ssafy.seniornaver.curation.service;

import com.ssafy.seniornaver.curation.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService{

    @Value("${naver-news.clientId}")
    private String clientId;
    @Value("${naver-news.clientSecret}")
    private String clientSecret;
    @Value("${news-img.kakaoApi}")
    private String kakaoApi;

    private final WebClient webClient;

    public List<NewsDto> getNewsList(String keyword) {
        String searchUrl = "https://openapi.naver.com/v1/search/news.json?query=" + keyword + "&display=50";

        SimpleDateFormat newsInputFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH);
        SimpleDateFormat newsOutputFormat = new SimpleDateFormat("yyyy/MM/dd");
        SimpleDateFormat imageInputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");

        List<NewsDto> newsList = this.webClient.get()
                .uri(searchUrl)
                .header("X-Naver-Client-Id", clientId)
                .header("X-Naver-Client-Secret", clientSecret)
                .retrieve()
                .bodyToMono(NewsApiResponse.class)
                .map(newsApiResponse -> newsApiResponse.getItems())
                .block();

        if (newsList != null) {
            for (NewsDto news : newsList) {

                String articleTitle = news.getTitle().replaceAll("[^a-zA-Z0-9가-힣 ]", "");

                Date newsDate = null;
                try {
                    newsDate = newsInputFormat.parse(news.getPubDate());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                String pubDate = newsOutputFormat.format(newsDate);

                String imageSearchUrl = "https://dapi.kakao.com/v2/search/image?query=" + articleTitle;

                List<KakaoImageDocument> imageList = this.webClient.get()
                        .uri(imageSearchUrl)
                        .header("Authorization", kakaoApi)
                        .retrieve()
                        .bodyToMono(KakaoImageResponse.class)
                        .map(kakaoImageResponse -> kakaoImageResponse.getDocuments())
                        .block();

                if (imageList != null) {
                    for (KakaoImageDocument image : imageList) {
                        String imageUrl = image.getImage_url();

                        Date imageDate = null;
                        try {
                            imageDate = imageInputFormat.parse(image.getDatetime());
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        String imagePubDate = newsOutputFormat.format(imageDate);


                        if (imagePubDate.equals(pubDate)) {
                            news.setImageUrl(imageUrl);
                            break;
                        }
                    }
                }
            }
            newsList = newsList.stream()
                    .filter(news -> news.getImageUrl() != null)
                    .collect(Collectors.toList());

//            // Log the size of newsList
//            System.out.println("Size of newsList after removing null imageUrl: " + newsList.size());

        }

        return newsList;
    }


}
