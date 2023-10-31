package com.ssafy.seniornaver.auth.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Getter
@NoArgsConstructor
@Slf4j
public class MemberResponseDto {


    private String memberId;

    private String mobile;

    private String name;

    private String nickname;

    private String email;

    private String profileUrl;

    // 생성자
    @Builder
    public MemberResponseDto(String memberId, String mobile, String name, String nickname, String email, String profileUrl) {
        this.memberId = memberId;
        this.mobile = mobile;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.profileUrl = profileUrl;
    }
}
