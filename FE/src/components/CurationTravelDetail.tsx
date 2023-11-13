import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import CurationMap from "./CurationMap";

const ShowDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 0.9vw;
  font-family: "NanumSquareNeoExtraBold";
`;
const ShowDetailResponsiveWrapper = styled.div`
  width: 100vw;
  display: flex;
  gap: 5vw;
  transition: all 0.3s ease-in-out;
`;
const CurationMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -1;
`;
const TravelContentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background: linear-gradient(90deg, #00f2ff, #00f2ffd5, #00f2ff8f, #ffffff10, #00f2ff30);
`;
const TravelGroupWrapper = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 5vw 0vw 5vw 10vw;
  /* background-color: #fe1717; */
`;
const TravelSubAddressWrapper = styled.div`
  font-size: 1.8vw;
  color: var(--dark50);
`;
const TravelTitleWrapper = styled.div`
  font-size: 4vw;
  color: var(--dark);
  font-family: "NanumSquareNeoHeavy";
`;
const TravelRowWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1vw;
  padding: 1vw 0vw;
`;
const TravelAddressWrapper = styled.div`
  font-size: 1.5vw;
`;
const TravelZipcodeWrapper = styled.div`
  font-size: 1.4vw;
  color: var(--dark50);
`;
const TravelOverviewWrapper = styled.div`
  height: 30vw;
  padding: 1vw;
  border-radius: 1vw;
  margin: 2vw 0vw;
  overflow-y: scroll;
  color: var(--dark70);
  background-color: var(--white50);
`;
const TravelOverviewTextWrapper = styled.div`
  font-size: 1.1vw;
  white-space: pre-wrap;
  padding: 1vw;
  margin: 1vw;
  border-radius: 1vw;
  color: var(--dark70);
  background: linear-gradient(90deg, var(--white70), var(--white50));
`;
const TravelRowBetweenWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const TravelLinkWrapper = styled.div`
  width: fit-content;
  padding: 1vw;
  border-radius: 99vw;
  font-size: 1.1vw;
  background: var(--white);
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
    background: var(--dark70);
    color: var(--white);
  }
`;
const TravelTelWrapper = styled.div`
  margin-bottom: 1vw;
  font-size: 1.1vw;
`;
const TravelMapMarkerWrapper = styled.div`
  position: absolute;
  top: 33vh;
  right: 23vw;
  background-color: #8460602c;
  z-index: 6;
`;
const TravelMapAreaWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10vw;
  height: 10vw;
  border-radius: 99vw;
  z-index: -3;
  background-color: #ff00002c;
`;
const TravelMapMarker = styled.img`
  height: 5vw;
  width: fit-content;
  z-index: 2;
`;
const TravelImageMarkerWrapper = styled.div<{ hovered: boolean }>`
  position: absolute;
  top: 5vh;
  right: 3vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  transition: all 0.3s ease-in-out;
  opacity: ${props => (props.hovered ? 1 : 0)};
`;
const TravelImageWrapper = styled.div`
  height: 10vw;
  width: fit-content;
  overflow: hidden;
  border-radius: 2vw;
`;
const TravelImage = styled.img`
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

function CurationTravelDetail({ navermaps }: { navermaps: typeof naver.maps }) {
  const { travelId } = useParams();
  const [dataTravelDetail, setDataTravelDetail] = useState({
    contentid: "",
    title: "",
    createdtime: "",
    modifiedtime: "",
    tel: "",
    telname: "",
    homepage: "",
    firstimage: "",
    firstimage2: "",
    areacode: "",
    sigungucode: "",
    addr1: "",
    addr2: "",
    zipcode: "",
    mapx: "",
    mapy: "",
    mlevel: "",
    overview: "",
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    fetchTravelDetail();
  }, [travelId]);

  const fetchTravelDetail = async () => {
    if (travelId) {
      try {
        const response = await axios.get(`/api/curation/v1/tourdt/detail/${parseInt(travelId)}`);
        setDataTravelDetail(response.data);
        console.log("관광 상세 데이터", dataTravelDetail);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <ShowDetailWrapper>
      <ShowDetailResponsiveWrapper>
        <CurationMapWrapper>
          <CurationMap
            navermaps={navermaps}
            x={dataTravelDetail.mapx}
            y={dataTravelDetail.mapy}
            dataTravelDetail={dataTravelDetail}
          />
        </CurationMapWrapper>
        <TravelContentWrapper>
          <TravelGroupWrapper>
            <TravelSubAddressWrapper>{dataTravelDetail.addr2.slice(1, -1)}</TravelSubAddressWrapper>
            <TravelTitleWrapper>{dataTravelDetail.title}</TravelTitleWrapper>
            <TravelRowWrapper>
              <TravelAddressWrapper>{dataTravelDetail.addr1}</TravelAddressWrapper>
              <TravelZipcodeWrapper>({dataTravelDetail.zipcode})</TravelZipcodeWrapper>
            </TravelRowWrapper>

            {dataTravelDetail.overview && (
              <TravelOverviewWrapper>
                {dataTravelDetail.overview
                  .split(".")
                  .map(
                    (line, index) =>
                      line.trim() && (
                        <TravelOverviewTextWrapper key={index}>
                          {line.trim()}.
                        </TravelOverviewTextWrapper>
                      ),
                  )}
              </TravelOverviewWrapper>
            )}
            <TravelRowBetweenWrapper>
              {dataTravelDetail.tel && (
                <TravelTelWrapper>Tel. {dataTravelDetail.tel}</TravelTelWrapper>
              )}
              {dataTravelDetail.homepage && (
                <TravelLinkWrapper onClick={() => handleLinkClick(dataTravelDetail.homepage)}>
                  홈페이지 바로가기
                </TravelLinkWrapper>
              )}
            </TravelRowBetweenWrapper>
          </TravelGroupWrapper>
        </TravelContentWrapper>
        <TravelMapMarkerWrapper onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <TravelMapAreaWrapper />
          <TravelMapMarker src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down.png" />
        </TravelMapMarkerWrapper>

        <TravelImageMarkerWrapper hovered={isHovered}>
          <TravelImageWrapper>
            <TravelImage src={dataTravelDetail.firstimage} />
          </TravelImageWrapper>
          <TravelImageWrapper>
            <TravelImage src={dataTravelDetail.firstimage2} />
          </TravelImageWrapper>
        </TravelImageMarkerWrapper>
      </ShowDetailResponsiveWrapper>
    </ShowDetailWrapper>
  );
}

export default CurationTravelDetail;
