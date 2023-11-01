package com.ssafy.seniornaver.error.exception;

import com.ssafy.seniornaver.error.code.ErrorCode;
import lombok.Getter;

import java.util.NoSuchElementException;

@Getter
public class DontSuchException extends NoSuchElementException {

    private ErrorCode errorCode;

    public DontSuchException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
