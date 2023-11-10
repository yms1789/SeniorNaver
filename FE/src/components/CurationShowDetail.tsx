import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";

const ShowDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9vw;
  font-family: "NanumSquareNeoBold";
`;
const ShowDetailResponsiveWrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 5vw;
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
`;
const ShowTitleWrapper = styled.div`
  display: flex;
  font-size: 2vw;
  font-family: "NanumSquareNeoExtraBold";
`;
const ShowGroupWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5vw;
`;
const ShowGroupTextWrapper = styled.div`
  display: flex;
  padding: 0.1vw 0.5vw;
  font-size: 1.1vw;
  color: var(--white);
  background-color: var(--aqua);
`;
const ShowRowPaleWrapper = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 4vw 1vw 40vw;
  gap: 0.5vw;
  color: var(--gray02);
  font-family: "NanumSquareNeoRegular";
`;
const ShowRowWrapper = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 4vw 1vw 40vw;
  gap: 0.5vw;
  color: var(--gray01);
`;
const ShowRowTextWrapper = styled.div`
  display: flex;
  gap: 0.5vw;
`;
const ShowColTextWrapper = styled.div``;
const ShowRowDividerWrapper = styled.div`
  color: var(--dark30);
`;
const ShowStateWrapper = styled.div<{ state: string }>`
  display: flex;
  padding: 0.1vw 0.2vw;
  border-radius: 0.3vw;
  font-size: 0.8vw;
  color: var(--dark50);
  background-color: ${props => (props.state === "공연중" ? "var(--aqua02)" : "var(--gray03)")};
  font-family: "NanumSquareNeoExtraBold";
`;
const ShowPosterImageWrapper = styled.img`
  width: 30vw;
  padding-top: 2.5vw;
  height: fit-content;
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
`;

function CurationShowDetail() {
  const { showId } = useParams();
  const [dataShowDetail, setDataShowDetail] = useState({
    mt20id: "",
    prfnm: "",
    prfpdfrom: "",
    prfpdto: "",
    fcltynm: "",
    prfcast: "",
    prfcrew: "",
    prfruntime: "",
    prfage: "",
    entrpsnm: "",
    pcseguidance: "",
    poster: "",
    sty: "",
    area: "",
    genrenm: "",
    openrun: "",
    prfstate: "",
    styUrlList: [""],
    dtguidance: "",
  });

  useEffect(() => {
    fetchShowDetail();
  }, []);

  const fetchShowDetail = async () => {
    if (showId) {
      try {
        const response = await axios.get(`/api/curation/v1/performance/${showId}`);
        setDataShowDetail(response.data);
        console.log("공연 상세 데이터", dataShowDetail);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createGroup = (title: string) => {
    return (
      <ShowGroupWrapper>
        <ShowGroupTextWrapper>{title}</ShowGroupTextWrapper>
      </ShowGroupWrapper>
    );
  };

  const createDetail = (title: string, value: string) => {
    if (value.trim()) {
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
  return (
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
              {createDetail("공연 날짜", `${dataShowDetail.prfpdfrom} ~ ${dataShowDetail.prfpdto}`)}
              {createDetail("관람 시간", dataShowDetail.prfruntime)}
              {dataShowDetail.dtguidance.trim() && (
                <ShowRowWrapper>
                  <ShowRowPaleWrapper>공연 시간</ShowRowPaleWrapper>
                  <ShowRowDividerWrapper>|</ShowRowDividerWrapper>
                  <ShowColTextWrapper>
                    {dataShowDetail.dtguidance.split(/,(?![^()]*\))/).map((item, index) => {
                      return <ShowColTextWrapper key={index}>{item}</ShowColTextWrapper>;
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
          <ShowPosterImageWrapper src={dataShowDetail.poster} />
        </ShowContextWrapper>
        <Divider />
        <ShowMiddleTextWrapper>공연 팜플렛</ShowMiddleTextWrapper>
        <ShowDetailImageWrapper>
          {dataShowDetail.styUrlList.map(image => {
            return <ShowDetailImage src={image} />;
          })}
        </ShowDetailImageWrapper>
      </ShowDetailResponsiveWrapper>
    </ShowDetailWrapper>
  );
}

export default CurationShowDetail;
