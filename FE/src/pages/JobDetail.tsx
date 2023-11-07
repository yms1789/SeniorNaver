import axios from "axios";
import { Suspense, useLayoutEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlinePhone } from "react-icons/ai";
import { Container as MapDiv, Marker, NaverMap } from "react-naver-maps";
import { useLocation } from "react-router";
import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import NavigationBar from "../components/NavigationBar";
import Loading from "./Loading";

interface IJobDetail {
  wantedTitle: string;
  acptMthdCd: string;
  age: string;
  ageLim: string;
  clerk: string;
  clerkContt: string;
  clltPrnnum: string;
  frAcptDd: string;
  toAcptDd: string;
  detCnts: string;
  etcItm: string;
  homepage: string;
  plDetAddr: string;
  plbizNm: string;
}
const JobDetailWrapper = styled.div`
  @media screen and (max-width: 400px) {
    width: 400px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 700px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 780px;
  }
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 140px;
`;

const DetailWrapper = styled.div`
  position: relative;
  @media screen and (max-width: 400px) {
    width: 300px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 700px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 780px;
  }
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  font-family: NanumSquareNeoRegular;
  border-top: 2px solid #222;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
`;
const DetailTitle = styled.h2`
  @media screen and (max-width: 400px) {
    font-size: 20px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    font-size: 40px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    font-size: 50px;
  }
  font-size: 50px;
  margin: 20px 0px;
  width: fit-content;
  margin-left: 10px;
`;

const DetailContentWrapper = styled.ul`
  @media screen and (max-width: 400px) {
    width: 300px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 700px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 780px;
  }
  list-style: none;
  padding: 24px 0 22px;
  border-top: 2px solid #ebebeb;
`;
const DetailImage = styled.img`
  @media screen and (max-width: 400px) {
    width: 250px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 300px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 300px;
  }
  width: 300px;
  height: 150px;
  float: left;
  border-radius: 10px;
  margin-left: 20px;
  border: 1px solid #ddd;
`;
const DetailIcon = styled.img`
  display: block;
  width: 45px;
  height: 45px;
  margin: 16px auto;
  font-size: 13px;
  font-weight: bold;
  color: #2346e4;
`;
const DetailTextWrapper = styled.div`
  margin-top: 28px;
  float: right;
`;
const DetailText = styled.li`
  float: left;
  width: 150px;
  height: 100px;
  margin: 0;
  padding: 0;
  text-align: center;
`;
const DetailDate = styled.p`
  border: 1.5px solid #acb2cc;
  border-radius: 8px;
  line-height: 44px;
  display: block;
  width: 45px;
  height: 45px;
  font-size: 13px;
  font-weight: bold;
  color: #2346e4;
  margin: 16px auto;
`;

const DetailConditionWrapper = styled.div`
  @media screen and (max-width: 400px) {
    width: 300px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 700px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 780px;
  }
  width: 100%;
  clear: both;
  margin: 0 auto;
  padding: 40px;
  position: relative;
`;
const DetailConditionTitle = styled.h3`
  @media screen and (max-width: 400px) {
    font-size: 20px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    font-size: 40px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    font-size: 50px;
  }
  margin-bottom: 21px;
  font-size: 26px;
  letter-spacing: -1px;
  font-size: 40px;
`;
const DetailConditionList = styled.dl`
  display: table;
  list-style: none;
`;
const DetailConditionTextTitle = styled.dt`
  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    font-size: 24px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    font-size: 24px;
  }
  display: inline;
  font-family: NanumSquareNeoBold;
  margin: 10px;
  margin: 0;
  padding: 0;
  font-size: 24px;
`;
const DetailConditionTextContent = styled.dd`
  @media screen and (max-width: 400px) {
    font-size: 12px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    font-size: 20px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    font-size: 20px;
  }
  margin-right: 10px;
  margin: 2px 0;
  padding: 0;
  font-size: 20px;
`;
const DetailConditionHomePage = styled.a`
  text-decoration: none;
  color: var(--gray01);
  &:hover {
    color: var(--emerald);
  }
`;
const MapWrapper = styled.div`
  @media screen and (max-width: 400px) {
    width: 300px;
  }
  @media screen and (min-width: 400px) and (max-width: 780px) {
    width: 700px;
  }
  @media screen and (min-width: 780px) and (max-width: 1280px) {
    width: 780px;
  }
  width: 100%;
  margin: 0 auto;
`;

function JobDetail({ navermaps }: { navermaps: typeof naver.maps }) {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [jobCoord, setJobCoord] = useState<{ mapx: number; mapy: number }>({ mapx: 0, mapy: 0 });

  async function fetchJobDetail() {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IJobDetail>(`/api/job/v1/post/detail/${state.jobId}`);
      setData(data);
      setIsLoading(false);
      navermaps.Service.geocode({ query: data.plDetAddr.slice(6) }, function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
          return alert("Something wrong!");
        }

        const result = response.v2; // 검색 결과의 컨테이너
        const { x, y } = result.addresses[0]; // 검색 결과의 배열
        setJobCoord({
          mapx: parseFloat(y),
          mapy: parseFloat(x),
        });
        // do Something
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        throw new Error(error.response?.data);
      }
    }
  }
  const [data, setData] = useState<IJobDetail>();

  useLayoutEffect(() => {
    fetchJobDetail();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <HeadBar />
      <Suspense fallback={<Loading />}>
        {data && (
          <JobDetailWrapper>
            <DetailWrapper>
              <DetailTitle>{data.wantedTitle}</DetailTitle>
              {/* 마감 몇 일 전, 위치, 내용, 전화번호, 지원 방법 */}
              <DetailContentWrapper>
                <DetailImage
                  src="https://image.alba.kr/job/photo_no.png
"
                />
                <DetailTextWrapper>
                  <DetailText>
                    <DetailDate>{`${
                      data.toAcptDd.split("-")[1] + "-" + data.toAcptDd.split("-")[2]
                    }`}</DetailDate>
                    마감 4일전
                  </DetailText>
                  <DetailText>
                    <DetailIcon src="https://image.alba.kr/job/JobDetail_period_I03.png" />
                    {state.jobclsNm || "6개월 ~ 1년"}
                  </DetailText>
                  <DetailText>
                    <DetailDate>
                      <IconContext.Provider
                        value={{
                          style: {
                            color: "#2346e4",
                            textAlign: "center",
                            marginTop: "6px",
                          },
                        }}
                      >
                        <AiOutlinePhone size={30} />
                      </IconContext.Provider>
                    </DetailDate>
                    {data.clerkContt}
                  </DetailText>
                  <DetailText>
                    <DetailDate>{data.acptMthdCd}</DetailDate>
                    지원 방식
                  </DetailText>
                </DetailTextWrapper>
                <DetailConditionWrapper>
                  <DetailConditionTitle>모집 조건</DetailConditionTitle>
                  <DetailConditionList>
                    <DetailConditionTextTitle>홈페이지</DetailConditionTextTitle>
                    <DetailConditionTextContent>
                      <DetailConditionHomePage
                        href={`${
                          data.homepage.includes("http") ? data.homepage : "http://" + data.homepage
                        }`}
                        target="_blank"
                      >
                        {data.homepage}
                      </DetailConditionHomePage>
                    </DetailConditionTextContent>
                  </DetailConditionList>
                  <DetailConditionList>
                    <DetailConditionTextTitle>위치</DetailConditionTextTitle>
                    <DetailConditionTextContent>{data.plDetAddr}</DetailConditionTextContent>
                  </DetailConditionList>
                  <DetailConditionList>
                    <DetailConditionTextTitle>우대사항</DetailConditionTextTitle>
                    <DetailConditionTextContent>{data.etcItm}</DetailConditionTextContent>
                  </DetailConditionList>
                </DetailConditionWrapper>
              </DetailContentWrapper>
            </DetailWrapper>
            {jobCoord.mapx > 0 && jobCoord.mapy > 0 && (
              <MapWrapper>
                <DetailConditionTitle>근무지 위치</DetailConditionTitle>
                <MapDiv
                  style={{
                    height: "600px",
                    overflow: "hidden",
                  }}
                >
                  <NaverMap
                    defaultCenter={new navermaps.LatLng(jobCoord.mapx, jobCoord.mapy)}
                    defaultZoom={21}
                    disableKineticPan={false}
                    zoomControl
                    zoomControlOptions={{
                      position: naver.maps.Position.TOP_RIGHT,
                    }}
                    minZoom={8}
                    maxZoom={21}
                  >
                    <Marker position={new navermaps.LatLng(jobCoord.mapx, jobCoord.mapy)} />
                  </NaverMap>
                </MapDiv>
              </MapWrapper>
            )}
          </JobDetailWrapper>
        )}
      </Suspense>
      <NavigationBar />
    </>
  );
}

export default JobDetail;
