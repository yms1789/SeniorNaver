import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import CurationCategoryButton from "../components/CurationCategoryButton";
import CurationShows from "../components/CurationShows";
import CurationNews from "../components/CurationNews";
import CurationTastes from "../components/CurationTastes";
import CurationTravels from "../components/CurationTravels";
import { useRecoilValue } from "recoil";
import { curationCategoryState } from "../states/curationCategory";

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
const Divider = styled.div`
  width: inherit;
  padding: 0.05vw;
  background-color: var(--gray04);
`;
const CurationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vw;
`;

interface caouselData {
  curationImages: string[];
  curationTexts: string[];
  mzWords: string[];
  places: string[][];
}

function Home() {
  const [dataCarousel, setDataCarousel] = useState<caouselData>({
    curationImages: [],
    curationTexts: [],
    mzWords: [],
    places: [[]],
  });

  const activeCategory = useRecoilValue(curationCategoryState);

  useEffect(() => {
    fetchCarousel();
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

  return (
    <HomeWrapper>
      <Carousel {...dataCarousel} />
      <Divider />
      <CurationWrapper>
        <CurationCategoryButton />
        {activeCategory === "뉴스" && <CurationNews />}
        {activeCategory === "공연" && <CurationShows />}
        {activeCategory === "맛집" && <CurationTastes />}
        {activeCategory === "관광" && <CurationTravels />}
      </CurationWrapper>
    </HomeWrapper>
  );
}

export default Home;
