package com.ssafy.seniornaver.chatbot.controller;

import com.ssafy.seniornaver.chatbot.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
public class ChatbotController {
    private ChatbotService chatbotService;


    @PostMapping("/talk")
    public String convertAndTalk(@RequestParam("voiceFile") MultipartFile voiceFile) {
        // 음성을 텍스트로 변환
        String text = chatbotService.convertSpeechToText(voiceFile);

        // 변환된 텍스트를 챗봇에 전달하고 챗봇의 응답을 받음
        String response = chatbotService.talkToChatbot(text);

        return response;
    }

}
