package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.mz.dto.request.DirectoryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.service.DirectoryService;
import com.ssafy.seniornaver.mz.service.TagService;
import com.ssafy.seniornaver.mz.service.VocabularyListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/directory/v1")
public class DirectoryController {

    private final DirectoryService directoryService;
    private final TagService tagService;
    private final VocabularyListService vocabularyListService;

    @GetMapping("/word/list")
    public ResponseEntity<List<DirectoryWordListResponseDto>> getWordList(DirectoryWordListRequestDto requestDto) {

        List<DirectoryWordListResponseDto> directoryWordListResponseDto = directoryService.getWordList(requestDto.getPage());

        return ResponseEntity.ok(directoryWordListResponseDto);
    }

    @GetMapping("member/word/list")
    public ResponseEntity<DirectoryWordListResponseDto> getMemberWordList(DirectoryWordListRequestDto requestDto) {

        List<DirectoryWordListResponseDto> directoryWordListResponseDto =
                directoryService.getMemberWordList(requestDto.getPage(), Member.builder().build());

        return null;
    }

}
