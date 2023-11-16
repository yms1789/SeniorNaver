import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { onErrorImg } from "../utils/utils";
import LoadingForCuration from "./LoadingForCuration";
import Footer from "./Footer";
import HeadBar from "./HeadBar";

const ShowDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  font-size: 0.9vw;
  font-family: "NanumSquareNeoBold";
  background-color: var(--aqua01);
`;
const ShowDetailResponsiveWrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 5vw;
  margin: 10rem 0;
  transition: all 0.3s ease-in-out;
  @media (max-width: 1280px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 95%;
  }
`;
const ShowContextWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const ShowContextDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  font-size: 1.3vw;
  @media (max-width: 1280px) {
    font-size: 2vw;
    gap: 3vw;
  }
  @media (max-width: 768px) {
    font-size: 4.5vw;
    gap: 4vw;
  }
`;
const ShowGapWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2vw;
`;
const ShowGenreWrapper = styled.div`
  display: flex;
  font-size: 1.5vw;
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 4.5vw;
  }
`;
const ShowTitleWrapper = styled.div`
  display: flex;
  font-size: 2vw;
  font-family: "NanumSquareNeoExtraBold";
  @media (max-width: 1280px) {
    font-size: 3vw;
  }
  @media (max-width: 768px) {
    font-size: 6vw;
  }
`;
const ShowGroupWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5vw;
`;
const ShowGroupTextWrapper = styled.div`
  display: flex;
  padding: 0.1vw 0.5vw;
  font-size: 1.1vw;
  color: var(--dark01);
  background: var(--transgradient);
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 5vw;
    padding: 0.1vw 1vw;
  }
`;
const ShowRowPaleWrapper = styled.div`
  width: fit-content;
  display: grid;
  gap: 0.5vw;
  white-space: nowrap;
  color: var(--gray02);
  font-family: "NanumSquareNeoRegular";
`;
const ShowRowWrapper = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 6vw 1vw 40vw;
  gap: 0.5vw;
  overflow-x: hidden;
  color: var(--gray01);
  @media (max-width: 1280px) {
    grid-template-columns: 9vw 1vw 46vw;
  }
  @media (max-width: 768px) {
    grid-template-columns: 16vw 3vw 72vw;
  }
`;
const ShowRowTextWrapper = styled.div`
  display: flex;
  gap: 1vw;
`;
const ShowColTextWrapper = styled.div``;
const ShowRowDividerWrapper = styled.div`
  color: var(--dark30);
`;
const ShowStateWrapper = styled.div<{ state: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1vw 0.2vw;
  border-radius: 0.3vw;
  font-size: 1vw;
  white-space: nowrap;
  color: var(--dark02);
  background: ${props => (props.state === "공연중" ? "var(--maingradient)" : "var(--gray03)")};
  font-family: "NanumSquareNeoBold";
  @media (max-width: 1280px) {
    font-size: 1.5vw;
    padding: 0.1vw 0.5vw;
  }
  @media (max-width: 768px) {
    font-size: 3.5vw;
    padding: 0.1vw 1vw;
  }
`;
const ShowPosterImageWrapper = styled.img`
  width: 30vw;
  padding-top: 2.5vw;
  height: fit-content;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Divider = styled.div`
  width: inherit;
  padding: 0.05vw;
  background-color: var(--gray04);
`;
const ShowMiddleTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.2vw;
  color: var(--dark01);
  font-family: "NanumSquareNeoExtraBold";
  @media (max-width: 1280px) {
    font-size: 2.5vw;
  }
  @media (max-width: 768px) {
    font-size: 5.5vw;
  }
`;
const ShowDetailImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ShowDetailImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 0 20%;
  @media (max-width: 1280px) {
    padding: 0 10%;
  }
  @media (max-width: 768px) {
    padding: 0;
  }
`;
const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CurationShowDetail() {
  const { showId } = useParams();

  const { data: dataShowDetail, isLoading } = useQuery(
    ["showDetail", showId],
    async () => {
      try {
        const response = await axios.get(`/api/curation/v1/performance/${showId}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch showdetail data");
      }
    },
    {
      enabled: !!showId,
    },
  );

  const createGroup = (title: string) => {
    return (
      <ShowGroupWrapper>
        <ShowGroupTextWrapper>{title}</ShowGroupTextWrapper>
      </ShowGroupWrapper>
    );
  };

  const createDetail = (title: string, value: string) => {
    if (value.trim() && dataShowDetail) {
      return (
        <ShowRowWrapper>
          <ShowRowPaleWrapper>{title}</ShowRowPaleWrapper>
          <ShowRowDividerWrapper>|</ShowRowDividerWrapper>
          <ShowRowTextWrapper>
            <ShowRowTextWrapper>{value}</ShowRowTextWrapper>
            <ShowRowTextWrapper>
              {title === "공연 날짜" && (
                <ShowStateWrapper state={dataShowDetail.prfstate}>
                  {dataShowDetail.prfstate}
                </ShowStateWrapper>
              )}
            </ShowRowTextWrapper>
          </ShowRowTextWrapper>
        </ShowRowWrapper>
      );
    }
  };

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingForCuration />
      </LoadingWrapper>
    );
  }

  if (!dataShowDetail) {
    return <ShowMiddleTextWrapper>데이터가 없습니다.</ShowMiddleTextWrapper>;
  }

  return (
    <>
      <HeadBar />
      <ShowDetailWrapper>
        <ShowDetailResponsiveWrapper>
          <ShowContextWrapper>
            <ShowContextDetailWrapper>
              <ShowGapWrapper>
                <ShowGenreWrapper>{dataShowDetail.genrenm}</ShowGenreWrapper>
                <ShowTitleWrapper>{dataShowDetail.prfnm}</ShowTitleWrapper>
              </ShowGapWrapper>
              <ShowGapWrapper>
                {createGroup("시간")}
                {createDetail(
                  "공연 날짜",
                  `${dataShowDetail.prfpdfrom} ~ ${dataShowDetail.prfpdto}`,
                )}
                {createDetail("관람 시간", dataShowDetail.prfruntime)}
                {dataShowDetail.dtguidance.trim() && (
                  <ShowRowWrapper>
                    <ShowRowPaleWrapper>공연 시간</ShowRowPaleWrapper>
                    <ShowRowDividerWrapper>|</ShowRowDividerWrapper>
                    <ShowColTextWrapper>
                      {dataShowDetail.dtguidance.split(/,(?![^()]*\))/).map((item: string) => {
                        return (
                          <ShowColTextWrapper key={self.crypto.randomUUID()}>
                            {item}
                          </ShowColTextWrapper>
                        );
                      })}
                    </ShowColTextWrapper>
                  </ShowRowWrapper>
                )}
              </ShowGapWrapper>
              <ShowGapWrapper>
                {createGroup("장소")}
                {createDetail("지역", dataShowDetail.area)}
                {createDetail("장소", dataShowDetail.fcltynm)}
              </ShowGapWrapper>
              <ShowGapWrapper>
                {createGroup("상세 정보")}
                {createDetail("좌석 가격", dataShowDetail.pcseguidance)}
                {createDetail("관람 등급", dataShowDetail.prfage)}
                {createDetail("주최 주관", dataShowDetail.entrpsnm)}
                {createDetail("주연 조연", dataShowDetail.prfcast)}
                {createDetail("감독", dataShowDetail.prfcrew)}
                {createDetail("개요", dataShowDetail.sty)}
              </ShowGapWrapper>
            </ShowContextDetailWrapper>
            <ShowPosterImageWrapper
              src={dataShowDetail.poster}
              alt="ShowPosterImage"
              onError={onErrorImg}
              referrerPolicy="no-referrer"
            />
          </ShowContextWrapper>
          <Divider />
          {dataShowDetail.styUrlList && (
            <>
              <ShowMiddleTextWrapper>공연 팜플렛</ShowMiddleTextWrapper>
              <ShowDetailImageWrapper>
                {dataShowDetail.styUrlList.map((image: string) => {
                  return (
                    <ShowDetailImage
                      src={image}
                      alt="ShowDetailImage"
                      onError={onErrorImg}
                      referrerPolicy="no-referrer"
                    />
                  );
                })}
              </ShowDetailImageWrapper>
            </>
          )}
        </ShowDetailResponsiveWrapper>
        <Footer />
      </ShowDetailWrapper>
    </>
  );
}

export default CurationShowDetail;
