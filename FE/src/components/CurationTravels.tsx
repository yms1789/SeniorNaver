import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import RoundedButton from "./RoundedButton";
import { handleSelect, initSelectedCategory, travelLocation } from "../utils/utils";
import { useNavigate } from "react-router";
import { travelCategoryState } from "../states/curationCategory";
import { useRecoilState } from "recoil";

const CurationTravelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vw;
`;
const TravelCategoryWrapper = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1vw;
`;
const TravelGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  /* background-color: #35a62b; */
  grid-template-columns: repeat(3, 25vw);
  gap: 2vw;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 40vw);
  }
`;
const DataTravelsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.7vw;
  transition: all 0.2s ease-in-out;
  color: var(--dark);
  &:hover {
    scale: 1.05;
    color: var(--aqua);
  }
`;
const TravelGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TravelSubAddressWrapper = styled.div`
  font-size: 1.1vw;
  color: var(--dark30);
`;
const TravelTitleWrapper = styled.div`
  font-size: 1.8vw;
`;
const TravelAddressWrapper = styled.div`
  font-size: 1.2vw;
  color: var(--gray02);
  font-family: "NanumsquareNeoRegular";
`;
const TravelImageWrapper = styled.div<{ hovered: string }>`
  height: 16vw;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: ${props => (props.hovered === "true" ? "2vw" : "")};
  transition: all 0.5s ease-in-out;
`;
const TravelImage = styled.img`
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const TravelBackImage = styled.img`
  flex-shrink: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

interface TTravelData {
  addr1: string;
  addr2: string;
  createdtime: string;
  contentid: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  modifiedtime: string;
  title: string;
  hovered?: boolean;
}

interface TSelectedShowCategory {
  [key: string]: boolean;
  전체: boolean;
  서울: boolean;
  경기: boolean;
  강원: boolean;
  인천: boolean;
  세종: boolean;
  광주: boolean;
  대전: boolean;
  충북: boolean;
  충남: boolean;
  전북: boolean;
  전남: boolean;
  대구: boolean;
  경북: boolean;
  부산: boolean;
  울산: boolean;
  경남: boolean;
  제주: boolean;
}

function CurationTravels() {
  const navigate = useNavigate();

  const initialSelectedCategory = initSelectedCategory<TSelectedShowCategory>(
    travelLocation,
    "전체",
  );

  const [dataTravels, setDataTravels] = useState<TTravelData[]>([]);
  const [frontTravels, setFrontTravels] = useState<TTravelData[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<TSelectedShowCategory>(travelCategoryState);

  const handleHover = (contentid: string, isHovered: boolean) => {
    setDataTravels(prevDataTravels => {
      return prevDataTravels.map(travel => {
        if (travel.contentid === contentid) {
          return { ...travel, hovered: isHovered };
        }
        return travel;
      });
    });
  };

  useEffect(() => {
    console.log(selectedCategory);
    const a = Object.keys(selectedCategory).filter(key => selectedCategory[key]);
    fetchTravels(a[0]);
  }, [selectedCategory]);

  useEffect(() => {
    fetchTravels("서울");
  }, []);

  const fetchTravels = async (code: string) => {
    let sendBE = 0;
    console.log(code);
    if (code === "서울") {
      sendBE = 1;
    }
    if (code === "인천") {
      sendBE = 2;
    }
    if (code === "대전") {
      sendBE = 3;
    }
    if (code === "대구") {
      sendBE = 4;
    }
    if (code === "광주") {
      sendBE = 5;
    }
    if (code === "부산") {
      sendBE = 6;
    }
    if (code === "울산") {
      sendBE = 7;
    }
    if (code === "세종") {
      sendBE = 8;
    }
    if (code === "경기") {
      sendBE = 31;
    }
    if (code === "강원") {
      sendBE = 32;
    }
    if (code === "충북") {
      sendBE = 33;
    }
    if (code === "충남") {
      sendBE = 34;
    }
    if (code === "경북") {
      sendBE = 35;
    }
    if (code === "경남") {
      sendBE = 36;
    }
    if (code === "전북") {
      sendBE = 37;
    }
    if (code === "전남") {
      sendBE = 38;
    }
    if (code === "제주") {
      sendBE = 39;
    }
    try {
      const response = await axios.get(`api/curation/v1/tourdt/${sendBE}`);
      const data = response.data.map((travel: TTravelData) => ({
        ...travel,
        hovered: false,
      }));
      setDataTravels(data);
      console.log("관광 데이터", dataTravels);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurationTravelWrapper>
      <TravelCategoryWrapper>
        {travelLocation.map(location => {
          const uuid = self.crypto.randomUUID();
          return (
            <RoundedButton
              key={uuid}
              buttonText={location}
              isActive={selectedCategory[location]}
              onClick={() => {
                handleSelect(
                  1,
                  location,
                  setSelectedCategory as React.Dispatch<
                    React.SetStateAction<Record<string, boolean>>
                  >,
                  initialSelectedCategory,
                );
                fetchTravels("서울");
              }}
            />
          );
        })}
      </TravelCategoryWrapper>
      <TravelGridWrapper>
        {dataTravels.map(travel => {
          return (
            <DataTravelsWrapper
              key={travel.contentid}
              onClick={() => navigate(`/travel/${travel.contentid}`)}
              onMouseEnter={() => handleHover(travel.contentid, true)}
              onMouseLeave={() => handleHover(travel.contentid, false)}
            >
              <TravelGroupWrapper>
                <TravelSubAddressWrapper>{travel.addr2.slice(1, -1)}</TravelSubAddressWrapper>
                <TravelTitleWrapper>{travel.title}</TravelTitleWrapper>
              </TravelGroupWrapper>
              <TravelAddressWrapper>{travel.addr1}</TravelAddressWrapper>
              <TravelImageWrapper hovered={travel.hovered ? "true" : "false"}>
                <TravelImage src={travel.firstimage2} />
                {travel.hovered && <TravelBackImage src={travel.firstimage} />}
              </TravelImageWrapper>
            </DataTravelsWrapper>
          );
        })}
      </TravelGridWrapper>
    </CurationTravelWrapper>
  );
}

export default CurationTravels;
