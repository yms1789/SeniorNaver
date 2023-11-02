package com.ssafy.seniornaver.jobposting.dto.response;

import lombok.Getter;
import java.util.Date;

@Getter
public class JobListResponseDto {
    private String acceptMethod;
    private String deadline;
    private String emplymShpNm;
    private Date startDate;
    private Date endDate;
    private String jobId;
    private String jobclsNm;
    private String oranNm;
    private String recruitTitle;
    private String systemName;
    private String workPlaceNm;
}
