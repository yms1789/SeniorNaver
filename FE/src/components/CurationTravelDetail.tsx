import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import CurationMap from "./CurationMap";
import locationpin from "../assets/images/locationpin.png";
import { onErrorImg } from "../utils/utils";

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
  ::-webkit-scrollbar {
    width: 0.9vw;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
    border-radius: 1vw;
  }
  ::-webkit-scrollbar-track {
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
  }
`;
const TravelSubAddressWrapper = styled.div`
  font-size: 1.8vw;
  color: var(--dark50);
  @media (max-width: 1280px) {
    font-size: 2.5vw;
  }
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;
const TravelTitleWrapper = styled.div`
  font-size: 4vw;
  color: var(--dark);
  font-family: "NanumSquareNeoHeavy";
  @media (max-width: 1280px) {
    font-size: 5vw;
  }
  @media (max-width: 768px) {
    font-size: 6vw;
  }
`;
const TravelRowWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 1vw;
  padding: 1vw 0vw;
`;
const TravelAddressWrapper = styled.div`
  font-size: 1.5vw;
  white-space: nowrap;
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;
const TravelZipcodeWrapper = styled.div`
  font-size: 1.4vw;
  color: var(--dark50);
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;
const TravelOverviewWrapper = styled.div`
  height: fit-content;
  padding: 1vw 0vw 1vw 1vw;
  border-radius: 1vw;
  margin: 2vw 0vw;
  overflow-y: scroll;
  color: var(--dark70);
  background-color: var(--white50);
`;
const TravelOverviewTextWrapper = styled.div`
  font-size: 1.1vw;
  white-space: pre-line;
  padding: 1vw;
  margin: 1vw;
  border-radius: 1vw;
  color: var(--dark70);
  background: linear-gradient(90deg, var(--white70), var(--white50));
  @media (max-width: 1280px) {
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    font-size: 1.7vw;
  }
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
  @media (max-width: 1280px) {
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    font-size: 2vw;
  }
`;
const TravelTelWrapper = styled.div`
  margin-bottom: 1vw;
  font-size: 1.1vw;
`;
const TravelMapMarkerWrapper = styled.div`
  position: absolute;
  bottom: 50%;
  right: 18.5vw;
  transform: translate(20%, 36%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 6;
`;
const TravelMapAreaWrapper = styled.div`
  width: 20vw;
  height: 20vw;
  border-radius: 99vw;
  z-index: -3;
  background-color: #ff000010;
`;
const TravelMapMarker = styled.img`
  position: absolute;
  height: 6vw;
  width: fit-content;
  z-index: 2;
  animation: floatAnimation 2s ease-in-out infinite;

  @keyframes floatAnimation {
    50% {
      transform: translateY(-2vw);
    }
  }
`;
const TravelImageMarkerWrapper = styled.div<{ hovered: boolean }>`
  position: absolute;
  bottom: 5vh;
  right: 3vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  transition: all 0.3s ease-in-out;
  opacity: ${props => (props.hovered ? 1 : 0)};
  z-index: 10;
`;
const TravelImageWrapper = styled.div`
  height: 20vw;
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
                  .split(". ")
                  .map(
                    (line, index) =>
                      line.trim() && (
                        <TravelOverviewTextWrapper key={index}>
                          {line.trim()}
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
          <TravelMapMarker src={locationpin} />
          <TravelMapAreaWrapper />
        </TravelMapMarkerWrapper>

        <TravelImageMarkerWrapper hovered={isHovered}>
          <TravelImageWrapper>
            <TravelImage
              src={dataTravelDetail.firstimage}
              alt="TravelImage"
              onError={onErrorImg}
              referrerPolicy="no-referrer"
            />
          </TravelImageWrapper>
        </TravelImageMarkerWrapper>
      </ShowDetailResponsiveWrapper>
    </ShowDetailWrapper>
  );
}

export default CurationTravelDetail;
