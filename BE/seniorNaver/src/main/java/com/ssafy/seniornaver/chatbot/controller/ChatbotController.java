package com.ssafy.seniornaver.chatbot.controller;

import com.ssafy.seniornaver.chatbot.service.ChatbotService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
public class ChatbotController {
    private final ChatbotService chatbotService;

    @PostMapping(value="/talk",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "음성 텍스트 변형", security = @SecurityRequirement(name = "Bearer"))
    public String convertAndTalk(@RequestPart("voiceFile") MultipartFile voiceFile) {
        log.info(String.valueOf("테스트1" + voiceFile));
        // 음성을 텍스트로 변환
        String text = chatbotService.convertSpeechToText(voiceFile);
        log.info("테스트2" + text);
        // 변환된 텍스트를 챗봇에 전달하고 챗봇의 응답을 받음
        String response = chatbotService.talkToChatbot(text);

        return text;
    }

}
