import styled from "styled-components";
import Carousel from "../components/Carousel";
import CurationCategoryButton from "../components/CurationCategoryButton";
import RoundedButton from "../components/RoundedButton";
import News from "../components/News";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 4vh 4vw;
  gap: 6vw;
  font-size: var(--font-size-base);
  font-family: "NanumSquare Neo ExtraBold";
  overflow-x: hidden;
  color: var(--dark02);
`;

interface caouselData {
  curationImages: string[];
  curationTexts: string[];
  mzWords: string[];
  places: string[][];
}
interface ShowData {
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

function Home() {
  const [dataCarousel, setDataCarousel] = useState<caouselData>({
    curationImages: [],
    curationTexts: [],
    mzWords: [],
    places: [[]],
  });
  const [dataShows, setDataShows] = useState<ShowData[]>([]);
  const [category, setCategory] = useState<string>("뉴스");
  useEffect(() => {
    fetchCarousel();
    fetchShows();
  }, []);

  const fetchCarousel = async () => {
    try {
      const response = await axios.get("/carousel");
      setDataCarousel(response.data);
      console.log("캐러셀 데이터", dataCarousel);
    } catch (error) {
      console.error(error);
    }
  };

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
    <HomeWrapper>
      <Carousel {...dataCarousel} />
      <CurationCategoryButton setCategory={setCategory} />
      <div>{category}</div>
      {dataShows.map(show => {
        return (
          <div key={show.pfId}>
            <div>{show.pfName}</div>
          </div>
        );
      })}
      {/* <News /> */}
      {/* <RoundedButton /> */}
    </HomeWrapper>
  );
}

export default Home;
