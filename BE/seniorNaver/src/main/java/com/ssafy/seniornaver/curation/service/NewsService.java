package com.ssafy.seniornaver.curation.service;

import com.ssafy.seniornaver.curation.dto.NewsDto;

import java.util.List;

public interface NewsService {
    List<NewsDto> getNewsList(String keyword);
}
