import styled from "styled-components";
import { useJobsQuery } from "../hooks/useJobsQuery";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export interface IJob {
  pageNo: number;
  totalCount: number;
  items: { item: IJobItem[] };
}
export interface IJobItem {
  acptKMthd: string;
  deadline: string;
  emplymShpNm: string;
  jobId: string;
  jobcls: string;
  jobclsNm: string;
  recrtTitle: string;
  workPlaceNm: string;
}

const JobWrapper = styled.div`
  font-family: NanumSquareNeoRegular;
  &:hover {
    background-color: #c5e3ed;
  }
`;

const JobTitle = styled.div`
  text-align: start;
  font-family: NanumSquareNeoExtraBold;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;
const JobDescription = styled.p`
  display: inline;
  text-align: start;
  padding-right: 8px;
`;

function JobList({ workplace }: { workplace: string }) {
  const { data } = useJobsQuery(workplace);
  const navigate = useNavigate();
  const handleClick = useCallback((item: IJobItem) => {
    navigate("/job-detail", { state: item });
  }, []);
  return data?.items.item.map((item: IJobItem) => {
    return (
      <JobWrapper key={item.jobId} onClick={() => handleClick(item)} role="button">
        <JobTitle>{item.recrtTitle}</JobTitle>
        <JobDescription>{`위치: ${item.workPlaceNm},`}</JobDescription>

        <JobDescription>{`채용공고: ${item.emplymShpNm}`}</JobDescription>
      </JobWrapper>
    );
  });
}

export default JobList;
