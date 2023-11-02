package com.ssafy.seniornaver.jobposting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JobListRequestDto {
    private int pageNum;
    private String emplymShp;
    private String workPlcNm;
}
