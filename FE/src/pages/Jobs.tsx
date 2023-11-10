import React, { Suspense, useCallback, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Combobox from "../components/Combobox";
import HeadBar from "../components/HeadBar";
import { IJob, IJobItem } from "../components/JobList";
import NavigationBar from "../components/NavigationBar";
import { fetchSearchJobs } from "../hooks/useJobsQuery";
import workplaceState from "../states/workplace";
import Loading from "./Loading";

const JobList = React.lazy(() => import("../components/JobList"));

const JobInput = styled.input`
  @media screen and (max-width: 400px) {
    width: 100%;
  }
  border-radius: 10px;
  border: 1px solid #000;
  width: 333px;
  font-size: 20px;
  padding: 12px;
`;
const SearchButton = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 10px;
  background: linear-gradient(180deg, #ff2e2e, #f19c4d);
  width: 48px;
  padding-top: 1px;
  height: 48px;
`;

const RectangleParent = styled.div`
  position: relative;
  width: 47px;
  height: 47px;
`;
const FrameGroup = styled.div`
  @media screen and (max-width: 400px) {
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
  }
  display: flex;
  gap: 10px;
  width: fit-content;
`;
const FrameParentRoot = styled.div`
  position: relative;
  display: block;
  justify-content: center;
  top: 200px;
`;
const JobCategoryWrapper = styled.div`
  @media screen and (max-width: 400px) {
    width: 100%;
    padding: 0px 20px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 100%;
    padding: 0px 20px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 100%;
    padding: 0px 40px;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1300px;
`;
const JobsWrapper = styled.div`
  @media screen and (max-width: 400px) {
    width: 100%;
    padding: 0px 20px;
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 100%;
    padding: 0px 20px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 100%;
    padding: 0px 40px;
    grid-template-columns: repeat(3, 1fr);
  }
  position: relative;
  top: 40px;
  max-width: fit-content;
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 20px;
  &.data-empty {
    /* 데이터가 없을 때의 스타일을 정의 */
    display: block;
    margin-top: 60px;
    justify-content: center;
    align-items: center;
  }
`;
const JobWrapper = styled.div`
  font-family: NanumSquareNeoRegular;
  cursor: pointer;
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

const places = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "강원",
  "경기",
  "경남",
  "경북",
  "전남",
  "전북",
  "제주",
  "충남",
  "충북",
];

function Jobs() {
  const navigate = useNavigate();
  const [workplace, setWorkplace] = useRecoilState(workplaceState);
  const [input, setInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState<IJob>();
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setIsSearch(true);
        setIsLoading(true);
        const response = await fetchSearchJobs(input, workplace);
        setSearchData(response);
        setIsLoading(false);
      }
    },
    [input],
  );
  const handleClick = useCallback(async () => {
    setIsSearch(true);
    setIsLoading(true);
    const response = await fetchSearchJobs(input, workplace);
    setSearchData(response);
    setIsLoading(false);
  }, [input]);
  const handleDetailClick = useCallback((item: IJobItem) => {
    navigate("/job-detail", { state: item });
  }, []);

  return (
    <>
      <HeadBar />
      <FrameParentRoot>
        <JobCategoryWrapper>
          <Combobox
            items={places}
            placeholder="근무지"
            setWorkplace={setWorkplace}
            workplace={workplace}
            setInput={setInput}
            setIsSearch={setIsSearch}
          />
          <FrameGroup>
            <JobInput
              ref={searchRef}
              placeholder="검색어를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleSearch}
              value={input}
            />
            <RectangleParent>
              <SearchButton onClick={handleClick}>
                <IconContext.Provider value={{ color: "white" }}>
                  <BiSearch size={30} />
                </IconContext.Provider>
              </SearchButton>
            </RectangleParent>
          </FrameGroup>
        </JobCategoryWrapper>
        <JobsWrapper ref={jobsRef}>
          <Suspense fallback={<Loading />}>
            {isSearch ? (
              isLoading ? (
                <Loading />
              ) : (
                searchData?.items.map((item: IJobItem) => {
                  return (
                    <JobWrapper
                      key={item.jobId}
                      onClick={() => handleDetailClick(item)}
                      role="button"
                    >
                      <JobTitle>{item.title}</JobTitle>
                      <JobDescription>{`위치: ${item.workPlace || "미지정"},`}</JobDescription>

                      <JobDescription>{`채용공고: ${item.employShape}`}</JobDescription>
                    </JobWrapper>
                  );
                })
              )
            ) : (
              <JobList workplace={workplace} jobsRef={jobsRef} />
            )}
          </Suspense>
        </JobsWrapper>
      </FrameParentRoot>
      <NavigationBar />
    </>
  );
}

export default Jobs;
