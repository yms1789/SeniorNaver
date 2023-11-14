import { useCallback } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export interface IJob {
  page: number;
  totalPage: number;
  items: IJobItem[];
}
export interface IJobItem {
  acceptMethod: string;
  deadline: string;
  employShape: string;
  jobId: string;
  jobClass: string;
  title: string;
  workPlace: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
}

export const JobWrapper = styled.div`
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 260px;
  }
  width: 300px;
  display: flex;
  flex-direction: column;
  font-family: NanumSquareNeoRegular;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c5e3ed;
  }
  border: 2px solid var(--gray02);
  border-radius: 10px;
  padding: 10px 10px;
`;

export const JobTitle = styled.div`
  text-align: start;
  font-family: NanumSquareNeoExtraBold;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;
export const JobDescription = styled.p`
  display: inline;
  text-align: start;
  padding-right: 8px;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

function RenderJobList({ jobData }: { jobData: IJob }) {
  const navigate = useNavigate();
  const handleClick = useCallback((item: IJobItem) => {
    navigate("/job-detail", { state: item });
  }, []);

  return jobData.items.map((item: IJobItem) => {
    return (
      <JobWrapper key={item.jobId} onClick={() => handleClick(item)} role="button">
        <JobTitle>{item.title}</JobTitle>
        <JobDescription>{`위치: ${item.workPlace || "미지정"}`}</JobDescription>

        <JobDescription>{`채용공고: ${item.employShape}`}</JobDescription>
      </JobWrapper>
    );
  });
}

export default RenderJobList;
