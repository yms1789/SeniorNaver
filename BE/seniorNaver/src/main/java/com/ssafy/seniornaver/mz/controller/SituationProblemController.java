package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.ProblemCreateRequestDto;
import com.ssafy.seniornaver.mz.service.SituationProblemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/problem")
public class SituationProblemController {

    private final JwtProvider jwtProvider;
    private final SituationProblemService situationProblemService;

    @PostMapping("/valid/{word}")
    public ResponseEntity wordCheck(@PathVariable("word") String word) {
        if (!situationProblemService.wordCheck(word)) {
            throw new BadRequestException(ErrorCode.NOT_EXIST_WORD);
        }

        return ResponseEntity.ok("작성 가능한 단어입니다.");
    }

    @PostMapping("/register")
    public ResponseEntity createProblem(ProblemCreateRequestDto problemCreateRequestDto) {

        situationProblemService.createProblem(problemCreateRequestDto);

        return ResponseEntity.ok("등록 완료");
    }
}
