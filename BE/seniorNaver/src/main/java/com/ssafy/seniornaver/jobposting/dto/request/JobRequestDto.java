package com.ssafy.seniornaver.jobposting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class JobRequestDto {
    private int pageNum;
    private String emplymShp;
    private String workPlcNm;
}
