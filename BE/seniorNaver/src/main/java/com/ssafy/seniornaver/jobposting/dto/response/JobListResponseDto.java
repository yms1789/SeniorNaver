package com.ssafy.seniornaver.jobposting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
public class JobListResponseDto {

    private List<item> item;

    @Getter
    @ToString
    public static class item {
        private String acptMthd;
        private String deadline;
        private String emplymShpNm;
        private String jobId;
        private String jobclsNm;
        private String recrtTitle;
        private String workPlc;
        private String workPlcNm;
    }
}
