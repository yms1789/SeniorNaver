package com.ssafy.seniornaver.auth.service;

import com.ssafy.seniornaver.auth.dto.Request.LogInRequestDto;
import com.ssafy.seniornaver.auth.dto.Request.keywordRequestDto;
import com.ssafy.seniornaver.auth.dto.Response.LogInResponseDto;
import com.ssafy.seniornaver.auth.dto.Request.LogOutRequestDto;
import com.ssafy.seniornaver.auth.dto.Request.SignUpRequestDto;

public interface MemberService {
    String signUp(SignUpRequestDto signUpRequestDto);

    LogInResponseDto logIn(LogInRequestDto logInRequestDto);

    Boolean validMemberId(String memberId);

    Boolean validNickname(String nickname);

    void logOut(LogOutRequestDto logOutRequestDto);

    String addDetails(keywordRequestDto keywordRequestDto);
}
