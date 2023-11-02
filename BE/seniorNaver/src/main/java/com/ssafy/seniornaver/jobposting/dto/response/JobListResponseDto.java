package com.ssafy.seniornaver.jobposting.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JobListResponseDto {

    private int pageNo;
    private int totalCount;
    private Items items;

    @Getter
    public static class Items {
        private List<item> item;
    }

    @Getter
    public static class item {
        private String acptMthd;
        private String deadline;
        private String emplymShpNm;
        private String jobId;
        private String jobclsNm;
        private String recrtTitle;
        private String workPlaceNm;
    }

    public void changeTotal(int totalPage) {
        this.totalCount = totalPage;
    }
}
