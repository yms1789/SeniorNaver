package com.ssafy.seniornaver.chatbot.service;

import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.commons.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatbotServiceImpl implements ChatbotService{
    @Value("${spring.naver.clientId}")
    private String clientId;

    @Value("${spring.naver.clientSecret}")
    private String clientSecret;

    @Value("${spring.naver.chatbot.invoke-url}")
    private String invokeUrl;

    @Value("${spring.naver.chatbot.secret-key}")
    private String secretKey;

    @Value("${ffmpeg.location}")
    private String ffmpegLocation;

    @Value("${ffprobe.location}")
    private String ffprobeLocation;

    private final WebClient webClient;

    @Override
    public String convertSpeechToText(MultipartFile voiceFile) {
        log.info("서비스 도착");
        String result = null;
        try {
            // 임시 파일 생성
            File tempFile = File.createTempFile("temp", ".tmp");
            voiceFile.transferTo(tempFile);
            log.info("임시 파일 생성 완료: " + tempFile.getAbsolutePath());

            // WAV 파일 경로 생성
            String wavFilePath = tempFile.getParentFile().getAbsolutePath() + File.separator + "converted.wav";

            // FFmpeg 명령 실행
            ffmpegToWav(tempFile.getAbsolutePath(), wavFilePath);
            log.info("FFmpeg 명령 실행 완료: " + wavFilePath);

            // 변환된 WAV 파일의 InputStream 생성
            File wavFile = new File(wavFilePath);
            InputStream inputStream = new FileInputStream(wavFile);

            String language = "Kor";        // 언어 코드 ( Kor, Jpn, Eng, Chn )
            String apiURL = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + language;
            URL url = new URL(apiURL);

            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setUseCaches(false);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestProperty("Content-Type", "application/octet-stream");
            conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            conn.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

            // HttpURLConnection의 OutputStream에 데이터 쓰기
            OutputStream outputStream = conn.getOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead = -1;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            outputStream.flush();
            inputStream.close();

            BufferedReader br = null;
            int responseCode = conn.getResponseCode();
            if(responseCode == 200) { // 정상 호출
                log.info("STT API 요청 성공: " + responseCode);
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {  // 오류 발생
                log.error("STT API 요청 실패: " + responseCode);
                log.error("error!!!!!!! responseCode= " + responseCode);
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            }

            String inputLine;
            if(br != null) {
                StringBuffer response = new StringBuffer();
                while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
                result = response.toString();
            } else {
                log.error("error !!!");
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return result;
    }

    private void ffmpegToWav(String inputFilePath, String outputFilePath) throws IOException {
        // FFmpeg 및 FFprobe 경로 설정
        FFmpeg ffmpeg = new FFmpeg(ffmpegLocation);
        FFprobe ffprobe = new FFprobe(ffprobeLocation);

        // FFmpeg 명령 실행
        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(inputFilePath)
                .overrideOutputFiles(true)
                .addOutput(outputFilePath)
                .done();
        ffmpeg.run(builder);
    }

    @Override
    public String talkToChatbot(String text) {
        // 챗봇 API 호출을 위한 요청 본문 작성
        String requestBody = "{ \"event\": \"send\", \"user\": \"user_id\", \"textContent\": { \"inputType\": \"typing\", \"text\": \"" + text + "\" } }";

        // WebClient 생성
        WebClient webClient = WebClient.builder()
                .baseUrl(invokeUrl)
                .defaultHeader("X-NCP-CHATBOT_SIGNATURE", secretKey)
                .build();

        // 챗봇 API 호출
        String response = webClient.post()
                .uri(invokeUrl) // Invoke URL
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 응답에서 챗봇의 응답 텍스트 추출
        String chatbotResponse = extractChatbotResponse(response);

        return chatbotResponse;
    }

    private String extractChatbotResponse(String response) {
        // 응답에서 챗봇의 응답 텍스트를 추출하는 로직을 작성합니다.
        // ...

        return "테스트";
    }
}
