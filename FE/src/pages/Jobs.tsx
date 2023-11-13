import React, { useCallback, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Combobox from "../components/Combobox";
import Error from "../components/Error";
import HeadBar from "../components/HeadBar";
import NavigationBar from "../components/NavigationBar";
import RenderJobList, { IJob } from "../components/RenderJobList";
import { useJobsQuery } from "../hooks/useJobsQuery";
import workplaceState from "../states/workplace";

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
  @media screen and (max-width: 425px) {
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 250px;
    margin: 0 auto;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 370px;
  }
  max-height: 48px;
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
    padding: 0px 20px;
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    padding: 0px 20px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    padding: 0px 40px;
    grid-template-columns: repeat(3, 1fr);
  }
  width: 100%;
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
const JobEmpty = styled.h1`
  @media screen and (max-width: 680px) {
    font-size: 36px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NanumSquareNeoExtraBold;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

const MoreButtonWrapper = styled.div`
  position: relative;
  top: 50px;
  text-align: center;
  font-family: NanumSquareNeoExtraBold;
  bottom: 0px;
  padding: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const MoreButton = styled.div`
  width: fit-content;
  font-size: 20px;
  border: 1px solid var(--gray04);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--emerald);
  }
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
  const [workplace, setWorkplace] = useRecoilState(workplaceState);
  const [input, setInput] = useState("");
  const searchRef = useRef(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  const { data, refetch, hasNextPage, fetchNextPage, remove } = useJobsQuery(workplace, input);

  const handleSearch = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        remove();
        refetch();
      }
    },
    [input],
  );
  useEffect(() => {
    if (data?.pages[0]?.totalPage! <= 0) {
      jobsRef.current?.classList.add("data-empty");
    } else {
      jobsRef.current?.classList.remove("data-empty");
    }
  }, [data]);

  return (
    <>
      <ErrorBoundary fallbackRender={Error}>
        <HeadBar />
        <FrameParentRoot>
          <JobCategoryWrapper>
            <Combobox
              items={places}
              placeholder="근무지"
              setWorkplace={setWorkplace}
              workplace={workplace}
              setInput={setInput}
              remove={remove}
              refetch={refetch}
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
                <SearchButton onClick={() => refetch()}>
                  <IconContext.Provider value={{ color: "white" }}>
                    <BiSearch size={30} />
                  </IconContext.Provider>
                </SearchButton>
              </RectangleParent>
            </FrameGroup>
          </JobCategoryWrapper>
          <JobsWrapper ref={jobsRef}>
            {data &&
              data.pages &&
              (data.pages[0]?.items.length! >= 1 ? (
                data.pages.map((data: IJob | undefined) => {
                  return <RenderJobList key={crypto.randomUUID()} jobData={data!} />;
                })
              ) : (
                <JobEmpty>공고 목록이 없습니다.</JobEmpty>
              ))}
          </JobsWrapper>
          {hasNextPage && (
            <MoreButtonWrapper>
              <MoreButton onClick={() => fetchNextPage()}>더 보기</MoreButton>
            </MoreButtonWrapper>
          )}
        </FrameParentRoot>
        <NavigationBar />
      </ErrorBoundary>
    </>
  );
}

export default Jobs;
