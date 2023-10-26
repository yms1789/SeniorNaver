package com.ssafy.seniornaver.auth.dto.Request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@NoArgsConstructor
@Getter
public class keywordRequestDto {

    private String memberId;

    @NotBlank(message = "닉네임을 입력해주세요.")
    private String nickname;

    @NotBlank(message = "지역을 선택해주세요.")
    private String region;

    @NotBlank(message = "키워드를 선택해주세요.")
    private List<String> keywords;
}
