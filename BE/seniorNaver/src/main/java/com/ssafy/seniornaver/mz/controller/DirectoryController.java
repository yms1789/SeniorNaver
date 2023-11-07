package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.DirectoryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DirectoryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.service.DirectoryService;
import com.ssafy.seniornaver.mz.service.TagService;
import com.ssafy.seniornaver.mz.service.VocabularyListService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/directory/v1")
public class DirectoryController {

    private final DirectoryService directoryService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final TagService tagService;
    private final VocabularyListService vocabularyListService;

    @GetMapping("/word/list")
    public ResponseEntity<List<DirectoryWordListResponseDto>> getWordList(DirectoryWordListRequestDto requestDto) {

        List<DirectoryWordListResponseDto> directoryWordListResponseDto = directoryService.getWordList(requestDto.getPage());

        return ResponseEntity.ok(directoryWordListResponseDto);
    }

    @GetMapping("member/word/list")
    public ResponseEntity<List<DirectoryWordListResponseDto>> getMemberWordList(HttpServletRequest httpServletRequest,
                                                                          DirectoryWordListRequestDto requestDto) {

        List<DirectoryWordListResponseDto> directoryWordListResponseDto =
                directoryService.getMemberWordList(requestDto.getPage(), getMember(httpServletRequest));

        return ResponseEntity.ok(directoryWordListResponseDto);
    }

    @PostMapping("word/register")
    public ResponseEntity<WordDetailResponseDto> createWord(WordCreateRequestDto wordCreateRequestDto) {

        WordDetailResponseDto wordDetailResponseDto = directoryService.wordCreate(wordCreateRequestDto);

        return ResponseEntity.ok(wordDetailResponseDto);
    }


    private Member getMember(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String bearer = header.substring(7);

        String memberId;
        try {
            memberId = (String) jwtProvider.get(bearer).get("memberId");
        } catch (ExpiredJwtException e) {
            throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
        }

        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> {
            throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
        });
        return member;
    }
}
