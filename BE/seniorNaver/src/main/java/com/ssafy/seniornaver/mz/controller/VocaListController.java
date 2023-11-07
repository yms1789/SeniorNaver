package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.VocaListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.VocaListResponseDto;
import com.ssafy.seniornaver.mz.service.VocabularyListService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/voca")
public class VocaListController {

    private final VocabularyListService vocabularyListService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @PostMapping("/register")
    public void createVocaList(HttpServletRequest httpServletRequest) {

        vocabularyListService.createVocaList(getMember(httpServletRequest));
    }

    @GetMapping("/list")
    public ResponseEntity<List<VocaListResponseDto>> getScrapWordList(HttpServletRequest httpServletRequest,
                                                                      VocaListRequestDto vocaListRequestDto) {

        List<VocaListResponseDto> scrapWordResponseDto = vocabularyListService.getScrapWordList(getMember(httpServletRequest), vocaListRequestDto);

        return ResponseEntity.ok(scrapWordResponseDto);
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
