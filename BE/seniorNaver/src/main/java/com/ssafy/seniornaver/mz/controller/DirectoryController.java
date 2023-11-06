package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.mz.dto.request.DirectoryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.service.DirectoryService;
import com.ssafy.seniornaver.mz.service.TagService;
import com.ssafy.seniornaver.mz.service.VocabularyListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/directory/v1")
public class DirectoryController {

    private final DirectoryService directoryService;
    private final TagService tagService;
    private final VocabularyListService vocabularyListService;

    @PostMapping("/word/list")
    public ResponseEntity<DirectoryWordListResponseDto> getWordList() {

    }

}
