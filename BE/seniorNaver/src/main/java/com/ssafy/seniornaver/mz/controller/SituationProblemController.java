package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.service.SituationProblemService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/problem")
public class SituationProblemController {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final SituationProblemService situationProblemService;

    @PostMapping("/valid/{word}")
    public ResponseEntity wordCheck(@PathVariable("word") String word) {
        if (!situationProblemService.wordCheck(word)) {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        }

        return ResponseEntity.ok("작성 가능한 단어입니다.");
    }

    @PostMapping("/register")
    public ResponseEntity createProblem(ProblemCreateRequestDto problemCreateRequestDto,
                                        HttpServletRequest httpServletRequest) {

        situationProblemService.relTagToProblem(
                situationProblemService.createProblem(problemCreateRequestDto, getMember(httpServletRequest)), problemCreateRequestDto);

        return ResponseEntity.ok("등록 완료");
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
