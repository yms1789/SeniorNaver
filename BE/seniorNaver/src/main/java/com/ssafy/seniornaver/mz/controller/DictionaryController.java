package com.ssafy.seniornaver.mz.controller;

import com.ssafy.seniornaver.auth.entity.Member;
import com.ssafy.seniornaver.auth.jwt.JwtProvider;
import com.ssafy.seniornaver.auth.repository.MemberRepository;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import com.ssafy.seniornaver.mz.dto.request.DictionaryWordListRequestDto;
import com.ssafy.seniornaver.mz.dto.request.WordCreateRequestDto;
import com.ssafy.seniornaver.mz.dto.response.DictionaryWordListResponseDto;
import com.ssafy.seniornaver.mz.dto.response.WordDetailResponseDto;
import com.ssafy.seniornaver.mz.service.DictionaryService;
import com.ssafy.seniornaver.mz.service.TagService;
import com.ssafy.seniornaver.mz.service.VocabularyListService;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Tag(name = "Dictionary", description = "사전관련 서비스")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/dictionary/v1")
public class DictionaryController {

    private final DictionaryService dictionaryService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final TagService tagService;
    private final VocabularyListService vocabularyListService;

    @Operation(summary = "전체 단어 조회", description = "ㄱㄴㄷ 순으로 단어 목록을 조회한다, page는 0부터 시작")
    @GetMapping("/word/list")
    public ResponseEntity<List<DictionaryWordListResponseDto>> getWordList(DictionaryWordListRequestDto requestDto) {

        List<DictionaryWordListResponseDto> dictionaryWordListResponseDto = dictionaryService.getWordList(requestDto.getPage());

        return ResponseEntity.ok(dictionaryWordListResponseDto);
    }

    @Operation(summary = "멤버 별 전체 단어 조회", description = "ㄱㄴㄷ 순으로 단어 목록을 조회한다, complete 값이 완료 단어에 따라 상이, page는 0부터 시작")
    @GetMapping("member/word/list")
    public ResponseEntity<List<DictionaryWordListResponseDto>> getMemberWordList(HttpServletRequest httpServletRequest,
                                                                                 DictionaryWordListRequestDto requestDto) {

        List<DictionaryWordListResponseDto> dictionaryWordListResponseDto =
                dictionaryService.getMemberWordList(requestDto.getPage(), getMember(httpServletRequest));

        return ResponseEntity.ok(dictionaryWordListResponseDto);
    }

    @Operation(summary = "사전에 단어 등록", description = "Admin 계정 전용, 추후 Admin 계정이 아닐 시 에러 반환 예정")
    @PostMapping("word/register")
    public ResponseEntity<WordDetailResponseDto> createWord(@RequestBody WordCreateRequestDto wordCreateRequestDto) {

        WordDetailResponseDto wordDetailResponseDto = dictionaryService.wordCreate(wordCreateRequestDto);

        return ResponseEntity.ok(wordDetailResponseDto);
    }

    @Operation(summary = "단어 상세", description = "id -> wordId")
    @PostMapping("word/{id}")
    public ResponseEntity<WordDetailResponseDto> wordDetail(@PathVariable("id") Long id,
                                    HttpServletRequest httpServletRequest) {

        WordDetailResponseDto wordDetailResponseDto = dictionaryService.getWordDetail(id, getMember(httpServletRequest).getVocaId());

        return ResponseEntity.ok(wordDetailResponseDto);
    }

    @Operation(summary = "단어 스크랩", description = "단어장이 있는 경우, 단어장에 단어 추가. id는 단어의 id => wordId")
    @PostMapping("word/scrap/{id}")
    public ResponseEntity scrapWord(@PathVariable("id") Long id,
                                    HttpServletRequest httpServletRequest) {

        dictionaryService.wordScrap(getMember(httpServletRequest).getVocaId(), id);

        return ResponseEntity.ok("스크랩 성공");
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
