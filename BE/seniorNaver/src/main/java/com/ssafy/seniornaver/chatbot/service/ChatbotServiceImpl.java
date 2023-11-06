package com.ssafy.seniornaver.chatbot.service;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import com.ssafy.seniornaver.error.code.ErrorCode;
import com.ssafy.seniornaver.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
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
            // 받은 음성 파일의 InputStream 생성
            InputStream inputStream = voiceFile.getInputStream();

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

    @Override
    public byte[] convertTextToSpeech(String text) {
        byte[] voiceData = null;
        try {
            String apiURL = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
            URL url = new URL(apiURL);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            conn.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

            // 요청 본문에 텍스트를 설정
            String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8.toString()); // 텍스트를 URL 인코딩
            String postParams = "speaker=nnarae&volume=0&speed=0&pitch=0&format=mp3&text=" + encodedText;

            conn.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();

            int responseCode = conn.getResponseCode();
            if(responseCode == 200) { // 정상 호출
                InputStream is = conn.getInputStream();
                int read = 0;
                byte[] bytes = new byte[1024];
                // 빈 바이트 배열을 생성
                voiceData = new byte[0];
                while ((read =is.read(bytes)) != -1) {
                    // 바이트 배열에 읽어온 데이터를 추가
                    voiceData = Arrays.copyOf(voiceData, voiceData.length + read);
                    System.arraycopy(bytes, 0, voiceData, voiceData.length - read, read);
                }
                is.close();
            } else {  // 오류 발생
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return voiceData;
    }

}
