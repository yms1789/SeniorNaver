package com.ssafy.seniornaver.chatbot.service;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatbotServiceImpl implements ChatbotService{
    @Value("${spring.naver.clientId}")
    private String clientId;

    @Value("${spring.naver.clientSecret}")
    private String clientSecret;

    @Value("${ffmpeg.location}")
    private String ffmpegLocation;

    @Value("${ffprobe.location}")
    private String ffprobeLocation;

    @Value("${google.service-account.privateKey.json}")
    private String privateKeyJson;

    public GoogleCredentials getGoogleCredentials() {
        try {
            return GoogleCredentials.fromStream(new ByteArrayInputStream(privateKeyJson.getBytes(StandardCharsets.UTF_8)));
        } catch (IOException e) {
            throw new RuntimeException("GoogleCredentials 생성 중 오류 발생", e);
        }
    }

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
        try {
            log.info("Dialogflow API 요청: {}", text);

            // GoogleCredentials 객체를 생성합니다.
            GoogleCredentials credentials = getGoogleCredentials();

            // SessionsSettings 객체를 생성하고 GoogleCredentials 객체를 설정합니다.
            SessionsSettings sessionsSettings = SessionsSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build();

            // GoogleCredentials 객체를 사용하여 SessionsClient를 생성합니다.
            SessionsClient sessionsClient = SessionsClient.create(sessionsSettings);

            // 세션 ID를 생성합니다. 일반적으로 UUID를 사용합니다.
            String sessionId = UUID.randomUUID().toString();

            // Dialogflow에서 사용하는 프로젝트 ID를 입력합니다.
            String projectId = "seniornaver-qysk";

            // 세션 이름을 생성합니다.
            SessionName session = SessionName.of(projectId, sessionId);

            // 사용자로부터 입력받은 텍스트를 설정합니다.
            TextInput.Builder textInput = TextInput.newBuilder().setText(text).setLanguageCode("ko-KR");

            // 쿼리 입력을 생성합니다.
            QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

            // Dialogflow API에 쿼리를 전송하고 응답을 받습니다.
            DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);

            // 응답에서 fulfillmentText를 추출합니다.
            String fulfillmentText = response.getQueryResult().getFulfillmentText();

            log.info("Dialogflow API 응답: {}", response);

            return fulfillmentText;
        } catch (Exception e) {
            log.error("Dialogflow API 에러 발생", e);
            throw new BadRequestException(ErrorCode.DIALOGFLOW_API_ERROR);
        }
    }

}
