import { Suspense, useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";
import Combobox from "../components/Combobox";
import HeadBar from "../components/HeadBar";
import NavigationBar from "../components/NavigationBar";
import { useJobsQuery } from "../hooks/useJobsQuery";
import { placeholderImage } from "../utils/utils";
const JobInput = styled.input`
  border-radius: 10px;
  border: 1px solid #000;
  width: 333px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  padding-top: 2px;
  height: 48px;
`;

const RectangleParent = styled.div`
  position: relative;
  width: 47px;
  height: 47px;
`;
const FrameGroup = styled.div`
  display: flex;
  gap: 10px;
  width: fit-content;
`;
const FrameParentRoot = styled.div`
  /* @media screen and (max-width: 360px) {
    width: 120px;
  }
  @media screen and (min-width: 360px) and (max-width: 780px) {
    width: 380px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 400px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1104px;
  } */
  position: relative;
  display: block;
  justify-content: center;
  min-width: 1340px;
  top: 200px;
`;
const JobCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 1300px;
`;
const JobsWrapper = styled.div`
  position: relative;
  top: 20px;
  width: 1300px;
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 20px;
`;
const JobWrapper = styled.div`
  font-family: NanumSquareNeoRegular;
`;
const JobImage = styled.img`
  display: block;
  width: 300px;
  height: 200px;
  border-radius: 10px;
`;

const JobTitle = styled.div`
  text-align: start;
  font-family: NanumSquareNeoExtraBold;
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

const jobs = Array.from({ length: 16 }, (_, idx) => {
  return {
    thumbnail: placeholderImage(Math.floor(Math.random() * 100) + idx),
    title: `채용 제목${idx + 1}`,
    place: `근무지${idx + 1}`,
    workType: `고용 형태${idx + 1}`,
  };
});

interface IJobTest {
  title: string;
  place: string;
  thumbnail: string;
  workType: string;
}
interface IJob {
  pageNo: number;
  totalCount: number;
  items: IJobItem[];
}
interface IJobItem {
  acptKMthd: string;
  deadline: string;
  emplymShpNm: string;
  jobId: string;
  jobcls: string;
  jobclsNm: string;
  recrtTitle: string;
  workPlaceNm: string;
}

function Jobs() {
  // const [width, setWidth] = useState(screen.width);
  const [workplace, setWorkplace] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const handleResize = () => {
  //   setWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  const { data, refetch } = useJobsQuery(workplace, searchInput);
  const handleSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      refetch();
    }
  }, []);

  return (
    <>
      <HeadBar />
      <FrameParentRoot>
        <JobCategoryWrapper>
          <Combobox items={places} placeholder="근무지" setWorkplace={setWorkplace} />
          <FrameGroup>
            <JobInput
              placeholder="검색어를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              value={searchInput}
            />
            <RectangleParent>
              <SearchButton>
                <IconContext.Provider value={{ color: "white" }}>
                  <BiSearch size={30} />
                </IconContext.Provider>
              </SearchButton>
            </RectangleParent>
          </FrameGroup>
        </JobCategoryWrapper>
        <JobsWrapper>
          <Suspense fallback={<p>로딩중...</p>}>
            {data?.items.map((item: IJobItem) => {
              return (
                <JobWrapper key={item.jobId}>
                  <JobTitle>{item.recrtTitle}</JobTitle>
                  <JobDescription>{`위치: ${item.workPlaceNm},`}</JobDescription>

                  <JobDescription>{`채용공고: ${item.emplymShpNm}`}</JobDescription>
                </JobWrapper>
              );
            })}
          </Suspense>
        </JobsWrapper>
      </FrameParentRoot>
      <NavigationBar />
    </>
  );
}

export default Jobs;
