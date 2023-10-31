package com.ssafy.seniornaver.auth.service;

import com.ssafy.seniornaver.auth.dto.Request.*;
import com.ssafy.seniornaver.auth.dto.Response.LogInResponseDto;
import com.ssafy.seniornaver.auth.dto.Response.MemberResponseDto;
import com.ssafy.seniornaver.auth.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MemberService {
    String signUp(SignUpRequestDto signUpRequestDto);

    LogInResponseDto logIn(LogInRequestDto logInRequestDto);

    Boolean validMemberId(String memberId);

    Boolean validNickname(String nickname);

    void logOut(LogOutRequestDto logOutRequestDto);


    UpdateProfilePictureDto updateProfilePicture(MultipartFile file, String id) throws IOException;

    MemberResponseDto getMemberInfo(String memberId);

    String addDetails(keywordRequestDto keywordRequestDto, MultipartFile file);
}
