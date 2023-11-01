package com.ssafy.seniornaver.location.controller;

import com.ssafy.seniornaver.error.exception.DontSuchException;
import com.ssafy.seniornaver.error.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@Order(1)
@RestControllerAdvice(basePackages = "com.ssafy.seniornaver.location.controller")
public class PlaceSearchControllerAdvice {

    @ExceptionHandler(DontSuchException.class)
    public ResponseEntity<ErrorResponse> dontSuchException(DontSuchException e) {
        log.error("dontSuchException : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.of(e);
    }
}
