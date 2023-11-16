import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { showCategoryState } from "../states/curationCategory";
import { upButtonState } from "../states/upButton";
import { useCurationShowsQuery } from "../hooks/useCurationQuery";
import { handleSelect, initSelectedCategory, onErrorImg, showGenre } from "../utils/utils";
import { TSelectedShowCategory } from "../utils/types";
import LoadingForCuration from "./LoadingForCuration";
import RoundedButton from "./RoundedButton";

const CurationShowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vw;
`;
const ShowCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;
const ShowGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, 18vw);
  gap: 2vw;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 30vw);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 46vw);
  }
`;
const DataShowsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  align-self: center;
  justify-content: center;
  padding: 1.1vw;
  gap: 0.7vw;
  background: var(--aqua01);
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.05;
    background: var(--transgradient);
  }
`;
const ShowPosterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const ShowImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const ShowImage = styled.img`
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const ShowStateWrapper = styled.div<{ $state: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0.2vw 0.4vw;
  font-size: 1vw;
  white-space: nowrap;
  color: ${props => (props.$state === "공연중" ? "var(--white)" : "var(--aqua)")};
  background: ${props => (props.$state === "공연중" ? "var(--transgradient)" : "var(--gray04)")};
  font-family: "NanumSquareNeoRegular";
`;
const StateWrapper = styled.div`
  padding: 0vw 0.5vw;
`;
const ShowTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
`;
const ShowTitleWrapper = styled.div`
  height: 3vw;
  font-size: 1vw;
  font-family: "NanumSquareNeoExtraBold";
  @media (max-width: 1280px) {
    height: 4vw;
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    height: 7vw;
    font-size: 2.5vw;
  }
`;
const ShowTheater = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 0.9vw;
  color: var(--gray01);
  font-family: "NanumSquareNeoBold";
  @media (max-width: 1280px) {
    font-size: 1.3vw;
  }
  @media (max-width: 768px) {
    font-size: 2vw;
  }
`;
const ShowDateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9vw;
  color: var(--gray02);
  font-family: "NanumSquareNeoRegular";

  @media (max-width: 1280px) {
    font-size: 1.3vw;
  }

  @media (max-width: 768px) {
    font-size: 2vw;
  }
`;
const ShowDateTextWrapper = styled.div``;
const NoDataWrapper = styled.div`
  width: 100vw;
  padding: 10vw 10vw 20vw 0vw;
  font-size: 2vw;
  text-align: center;
`;
const BottomBoundaryRef = styled.div`
  height: 1px;
`;

interface TShowData {
  pfId: string;
  performenceName: string;
  startDate: string;
  endDate: string;
  theaterName: string;
  poster: string;
  genre: string;
  pfState: string;
  openRun: string;
}

function CurationShows() {
  const navigate = useNavigate();

  const initialSelectedCategory = initSelectedCategory<TSelectedShowCategory>(showGenre, "전체");
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<TSelectedShowCategory>(showCategoryState);
  const [_, setUpButton] = useRecoilState(upButtonState);

  const [dataShows, setDataShows] = useState<TShowData[]>([]);
  const [visibleData, setVisibleData] = useState<TShowData[]>([]);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(0);
  const [changeCategory, setChangeCategory] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);

  const { data: showsData, isLoading } = useCurationShowsQuery();

  useEffect(() => {
    if (showsData) {
      setDataShows(showsData);
    }
  }, [showsData]);

  useEffect(() => {
    if (page > 0) {
      setUpButton(true);
    }
  }, [page]);

  useEffect(() => {
    const filteredShows = dataShows.filter(show => {
      if (selectedCategory["전체"]) {
        return true;
      }
      return selectedCategory[show.genre];
    });
    setVisibleData(filteredShows.slice(0, (page === 0 ? 1 : page + 1) * 10));
    if (visibleData.length === 0) {
      setNoData(true);
    }
  }, [dataShows, page]);

  useEffect(() => {
    setChangeCategory(true);
    if (changeCategory) {
      setDataShows([]);
      setPage(0);
    }
    setChangeCategory(false);
  }, [selectedCategory]);

  useEffect(() => {
    // Intersection Observer를 초기화합니다.
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
      setPage(prevPage => prevPage + 1); // 페이지를 증가시켜 추가 데이터를 화면에 보여줍니다.
    }
  };

  return (
    <CurationShowWrapper>
      <ShowCategoryWrapper>
        {showGenre.map(genre => {
          return (
            <RoundedButton
              key={self.crypto.randomUUID()}
              buttonText={genre}
              isActive={selectedCategory[genre]}
              onClick={() =>
                handleSelect(
                  2,
                  genre,
                  setSelectedCategory as React.Dispatch<
                    React.SetStateAction<Record<string, boolean>>
                  >,
                  initialSelectedCategory,
                )
              }
            />
          );
        })}
      </ShowCategoryWrapper>
      {!isLoading ? (
        <ShowGridWrapper>
          {noData && visibleData.length === 0 ? (
            <NoDataWrapper>해당 결과가 없습니다.</NoDataWrapper>
          ) : (
            visibleData.map(show => {
              return (
                <DataShowsWrapper
                  key={self.crypto.randomUUID()}
                  onClick={() => navigate(`/show/${show.pfId}`)}
                >
                  <ShowPosterWrapper>
                    <ShowImageWrapper>
                      <ShowImage
                        src={show.poster}
                        alt="ShowImage"
                        onError={onErrorImg}
                        referrerPolicy="no-referrer"
                      />
                    </ShowImageWrapper>
                    <ShowStateWrapper $state={show.pfState}>
                      {Array(10)
                        .fill(show.pfState)
                        .map(state => {
                          return (
                            <StateWrapper key={self.crypto.randomUUID()}>{state}</StateWrapper>
                          );
                        })}
                    </ShowStateWrapper>
                  </ShowPosterWrapper>
                  <ShowTextWrapper>
                    <ShowTitleWrapper>{show.performenceName.slice(0, 46)}</ShowTitleWrapper>
                    <ShowTheater>{show.theaterName}</ShowTheater>
                    <ShowDateWrapper>
                      <ShowDateTextWrapper>{show.startDate}</ShowDateTextWrapper>
                      <ShowDateTextWrapper>{show.endDate}</ShowDateTextWrapper>
                    </ShowDateWrapper>
                  </ShowTextWrapper>
                </DataShowsWrapper>
              );
            })
          )}
        </ShowGridWrapper>
      ) : (
        <LoadingForCuration />
      )}
      <BottomBoundaryRef ref={bottomBoundaryRef} />
    </CurationShowWrapper>
  );
}

export default CurationShows;
