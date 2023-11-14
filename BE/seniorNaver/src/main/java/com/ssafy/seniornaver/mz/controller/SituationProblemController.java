package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.request.ProblemListRequestDto;
import com.ssafy.seniornaver.mz.dto.response.ProblemListResponseDto;
import com.ssafy.seniornaver.mz.entity.SituationProblem;
import com.ssafy.seniornaver.mz.service.SituationProblemService;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Tag(name = "Problem", description = "문제 관련 서비스")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/problem")
public class SituationProblemController {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final SituationProblemService situationProblemService;

    @Operation(summary = "단어 확인", description = "문제 생성이 가능한 단어인지 확인합니다.")
    @PostMapping("/valid/{word}")
    public ResponseEntity wordCheck(@PathVariable("word") String word) {
        if (!situationProblemService.wordCheck(word)) {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        }

        return ResponseEntity.ok("작성 가능한 단어입니다.");
    }

    @Operation(summary = "문제 등록", description = "문제를 등록합니다. 로그인이 된 상태여야 합니다.")
    @PostMapping("/register")
    public ResponseEntity createProblem(@RequestBody ProblemCreateRequestDto problemCreateRequestDto,
                                        HttpServletRequest httpServletRequest) {

        situationProblemService.relTagToProblem(
                situationProblemService.createProblem(problemCreateRequestDto, getMember(httpServletRequest)), problemCreateRequestDto);

        return ResponseEntity.ok("등록 완료");
    }

    @Operation(summary = "문제 리스트 목록", description = "로그인 되어있을경우 푼 문제, 저장한 문제를 구분합니다.")
    @GetMapping("/list")
    public ResponseEntity<List<ProblemListResponseDto>> getMemberProblemList(ProblemListRequestDto problemListRequestDto,
                                                                             HttpServletRequest httpServletRequest) {

        List<ProblemListResponseDto> problemListResponseDto;
        if (httpServletRequest.getHeader("Authorization") != null) {
            problemListResponseDto = situationProblemService.getMemberProblemList(problemListRequestDto, getMember(httpServletRequest));
        } else {
            problemListResponseDto = situationProblemService.getProblemList(problemListRequestDto);
        }

        return ResponseEntity.ok(problemListResponseDto);
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
