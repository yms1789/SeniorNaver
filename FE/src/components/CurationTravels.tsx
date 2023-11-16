import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { travelCategoryState } from "../states/curationCategory";
import { upButtonState } from "../states/upButton";
import { useCurationTravelsQuery } from "../hooks/useCurationQuery";
import { handleSelect, initSelectedCategory, onErrorImg, travelLocation } from "../utils/utils";
import { TSelectedTravelCategory, TTravelData } from "../utils/types";
import LoadingForCuration from "./LoadingForCuration";
import RoundedButton from "./RoundedButton";

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
  @media (max-width: 1280px) {
    width: 60vw;
  }
  @media (max-width: 768px) {
    width: 70vw;
  }
`;
const TravelGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 23.5vw);
  gap: 4vw;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 45vw);
  }
  /* @media (max-width: 768px) {
    grid-template-columns: repeat(2, 45vw);
  } */
`;
const DataTravelsWrapper = styled.div`
  cursor: pointer;
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
  height: 3vw;
  display: flex;
  align-items: end;
  font-size: 1.1vw;
  color: var(--dark30);
  @media (max-width: 1280px) {
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    font-size: 1.7vw;
  }
`;
const TravelTitleWrapper = styled.div`
  font-size: 1.8vw;
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;
const TravelAddressWrapper = styled.div`
  font-size: 1.2vw;
  color: var(--gray02);
  font-family: "NanumsquareNeoRegular";
  @media (max-width: 1280px) {
    font-size: 1.8vw;
  }
  @media (max-width: 768px) {
    font-size: 2vw;
  }
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
const BottomBoundaryRef = styled.div`
  height: 1px;
`;

function CurationTravels() {
  const navigate = useNavigate();

  const initialSelectedCategory = initSelectedCategory<TSelectedTravelCategory>(
    travelLocation,
    "서울",
  );
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<TSelectedTravelCategory>(travelCategoryState);
  const [_, setUpButton] = useRecoilState(upButtonState);

  const [dataTravels, setDataTravels] = useState<TTravelData[]>([]);
  const [visibleData, setVisibleData] = useState<TTravelData[]>([]);
  const [page, setPage] = useState(0);
  const [changeCategory, setChangeCategory] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);

  const { data: travelsData, isLoading } = useCurationTravelsQuery();

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
    if (page > 1) {
      setUpButton(true);
    }
  }, [page]);

  useEffect(() => {
    if (travelsData) {
      setDataTravels(travelsData);
    }
  }, [travelsData]);

  useEffect(() => {
    setVisibleData(dataTravels.slice(0, (page === 0 ? 1 : page + 1) * 10));
  }, [dataTravels, page]);

  useEffect(() => {
    setChangeCategory(true);
    if (changeCategory) {
      setDataTravels([]);
      setPage(0);
    }
    setChangeCategory(false);
  }, [selectedCategory]);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (bottomBoundaryRef.current) {
      observer.current.observe(bottomBoundaryRef.current);
    }
    return () => {
      if (bottomBoundaryRef.current && observer.current) {
        observer.current.unobserve(bottomBoundaryRef.current);
      }
    };
  }, []);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    // Scroll back to the stored position when coming back from the detail page
    const storedScrollPosition = sessionStorage.getItem("storedScrollPosition");
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition));
      sessionStorage.removeItem("storedScrollPosition"); // Clear the stored position
    }
  }, [visibleData]);

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
              }}
            />
          );
        })}
      </TravelCategoryWrapper>
      {!isLoading ? (
        <TravelGridWrapper>
          {visibleData.map(travel => {
            return (
              <DataTravelsWrapper
                key={travel.contentid}
                onClick={() => {
                  navigate(`/travel/${parseInt(travel.contentid)}`);
                }}
                onMouseEnter={() => handleHover(travel.contentid, true)}
                onMouseLeave={() => handleHover(travel.contentid, false)}
              >
                <TravelGroupWrapper>
                  <TravelSubAddressWrapper>{travel.addr2.slice(1, -1)}</TravelSubAddressWrapper>
                  <TravelTitleWrapper>{travel.title}</TravelTitleWrapper>
                </TravelGroupWrapper>
                <TravelAddressWrapper>{travel.addr1}</TravelAddressWrapper>
                <TravelImageWrapper hovered={travel.hovered ? "true" : "false"}>
                  <TravelImage
                    src={travel.firstimage}
                    alt="TravelImage"
                    onError={onErrorImg}
                    referrerPolicy="no-referrer"
                  />
                </TravelImageWrapper>
              </DataTravelsWrapper>
            );
          })}
        </TravelGridWrapper>
      ) : (
        <LoadingForCuration />
      )}
      <BottomBoundaryRef ref={bottomBoundaryRef} />
    </CurationTravelWrapper>
  );
}

export default CurationTravels;
