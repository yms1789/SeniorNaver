package com.ssafy.seniornaver.chatbot.controller;

import com.ssafy.seniornaver.chatbot.service.ChatbotService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
public class ChatbotController {
    private final ChatbotService chatbotService;

    @PostMapping(value="/v1/talk",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "음성 텍스트 변형", security = @SecurityRequirement(name = "Bearer"))
    public ResponseEntity<byte[]> convertAndTalk(@RequestPart("voiceFile") MultipartFile voiceFile) {

        // 파일 이름 확인
        String originalFilename = voiceFile.getOriginalFilename();
        log.info("전송된 파일 이름: " + originalFilename);

        // 음성을 텍스트로 변환
        String text = chatbotService.convertSpeechToText(voiceFile);
        log.info("테스트2 " + text);
        // 변환된 텍스트를 챗봇에 전달하고 챗봇의 응답을 받음
        String response = chatbotService.talkToChat(text);
        log.info("테스트3 " + response);
        // 챗봇의 응답을 음성으로 변환
        byte[] voiceData = chatbotService.convertTextToSpeech(response);

        // 음성 데이터를 HTTP 응답 본문에 담아 반환
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg")
                .body(voiceData);
//        return response;
    }

}
