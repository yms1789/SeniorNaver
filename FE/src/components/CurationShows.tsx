import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import RoundedButton from "./RoundedButton";
import { handleSelect, initSelectedCategory, showGenre } from "../utils/utils";
import { useNavigate } from "react-router";
import { showCategoryState } from "../states/curationCategory";
import { useRecoilState } from "recoil";

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
  /* background-color: #35a62b; */
  grid-template-columns: repeat(4, 18vw);
  gap: 2vw;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 25vw);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 40vw);
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
  background-color: var(--aqua01);
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.05;
    background-color: var(--aqua);
  }
`;
const ShowPosterWrapper = styled.div`
  width: 100%;
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
const ShowStateWrapper = styled.div<{ state: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0.2vw 0.4vw;
  font-size: 0.85vw;
  white-space: nowrap;
  color: ${props => (props.state === "공연중" ? "var(--white)" : "var(--aqua)")};
  background-color: ${props => (props.state === "공연중" ? "var(--aqua)" : "var(--gray04)")};
  font-family: "NanumSquareNeoRegular";
`;
const StateWrapper = styled.div`
  padding: 0vw 0.5vw;
`;
const ShowTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2vw;
`;
const ShowTitleWrapper = styled.div`
  font-size: 0.9vw;
  font-family: "NanumSquareNeoHeavy";
`;
const ShowTheater = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 0.8vw;
  color: var(--gray01);
  font-family: "NanumSquareNeoHeavy";
`;
const ShowDateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.8vw;
  color: var(--gray02);
`;
const ShowDateTextWrapper = styled.div``;

interface TShowData {
  pfId: string;
  pfName: string;
  startDate: string;
  endDate: string;
  theater: string;
  poster: string;
  genre: string;
  pfState: string;
  openRun: string;
}

interface TSelectedShowCategory {
  [key: string]: boolean;
  전체: boolean;
  클래식: boolean;
  뮤지컬: boolean;
  국악: boolean;
  대중음악: boolean;
  연극: boolean;
  서커스마술: boolean;
  무용: boolean;
}

function CurationShows() {
  const navigate = useNavigate();

  const initialSelectedCategory = initSelectedCategory<TSelectedShowCategory>(showGenre, "전체");

  const [dataShows, setDataShows] = useState<TShowData[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<TSelectedShowCategory>(showCategoryState);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get("/shows");
      setDataShows(response.data);
      console.log("공연 데이터", dataShows);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurationShowWrapper>
      <ShowCategoryWrapper>
        {showGenre.map(genre => {
          const uuid = self.crypto.randomUUID();
          return (
            <RoundedButton
              key={uuid}
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
      <ShowGridWrapper>
        {dataShows
          .filter(show => {
            if (selectedCategory["전체"]) return true;
            return selectedCategory[show.genre];
          })
          .map(show => {
            return (
              <DataShowsWrapper key={show.pfId} onClick={() => navigate(`/show/${show.pfId}`)}>
                <ShowPosterWrapper>
                  <ShowImageWrapper>
                    <ShowImage src={show.poster} />
                  </ShowImageWrapper>
                  <ShowStateWrapper state={show.pfState}>
                    {Array(6)
                      .fill(show.pfState)
                      .map(state => {
                        return <StateWrapper>{state}</StateWrapper>;
                      })}
                  </ShowStateWrapper>
                </ShowPosterWrapper>
                <ShowTextWrapper>
                  <ShowTitleWrapper>{show.pfName}</ShowTitleWrapper>
                  <ShowTheater>{show.theater}</ShowTheater>
                  <ShowDateWrapper>
                    <ShowDateTextWrapper>{show.startDate}</ShowDateTextWrapper>
                    <ShowDateTextWrapper>{show.endDate}</ShowDateTextWrapper>
                  </ShowDateWrapper>
                </ShowTextWrapper>
              </DataShowsWrapper>
            );
          })}
      </ShowGridWrapper>
    </CurationShowWrapper>
  );
}

export default CurationShows;
