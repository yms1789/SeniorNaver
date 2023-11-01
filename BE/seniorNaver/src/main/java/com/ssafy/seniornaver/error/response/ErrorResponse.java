package com.ssafy.seniornaver.error.response;

import com.ssafy.seniornaver.error.exception.DontSuchException;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponse {
    private String httpStatus;
    private String errorCode;
    private String errorMessage;

    public static ErrorResponse of(String httpStatus, String errorCode, String errorMessage) {
        return ErrorResponse.builder()
                .httpStatus(httpStatus)
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }

    public static ResponseEntity<ErrorResponse> of(DontSuchException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus().toString())
                        .errorCode(e.getErrorCode().getErrorCode())
                        .errorMessage(e.getErrorCode().getMessage())
                        .build());
    }
}