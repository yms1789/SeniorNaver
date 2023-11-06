package com.ssafy.seniornaver.mz.dto.response;

import com.ssafy.seniornaver.auth.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VocaListResponseDto {
    private Long memberId;

    // 화면에 어떤걸 띄워야할지 생각해봅시다.
    @Builder
    public VocaListResponseDto(Long memberId) {
        this.memberId = memberId;
    }
}
