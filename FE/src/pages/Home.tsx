import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { curationCategoryState } from "../states/curationCategory";
import { useCurationCarouselQuery } from "../hooks/useCurationQuery";
import CurationCategoryButton from "../components/CurationCategoryButton";
import LoadingForCuration from "../components/LoadingForCuration";
import CurationTravels from "../components/CurationTravels";
import CurationTastes from "../components/CurationTastes";
import CurationShows from "../components/CurationShows";
import CurationNews from "../components/CurationNews";
import Carousel from "../components/Carousel";
import HeadBar from "../components/HeadBar";
import NavigationBar from "../components/NavigationBar";

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 11vh 2vh 4vw;
  gap: 6vw;
  font-size: var(--font-size-base);
  font-family: "NanumSquare Neo ExtraBold";
  overflow-x: hidden;
  color: var(--dark02);
  /* @media (max-width: 1280px) {
    padding: 11vh 4vw;
  } */
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

function Home() {
  const activeCategory = useRecoilValue(curationCategoryState);

  const { data: dataCarousel, isLoading } = useCurationCarouselQuery();

  if (isLoading) {
    return (
      <HomeWrapper>
        <LoadingForCuration />
      </HomeWrapper>
    );
  }

  return (
    <HomeWrapper>
      <HeadBar />
      <NavigationBar />
      {dataCarousel && (
        <Carousel
          curations={dataCarousel.curations}
          mzWords={dataCarousel.mzWords}
          places={dataCarousel.places}
        />
      )}
      <Divider />
      <CurationWrapper>
        <CurationCategoryButton />
        {activeCategory === "공연" && <CurationShows />}
        {activeCategory === "관광" && <CurationTravels />}
        {activeCategory === "맛집" && <CurationTastes />}
        {activeCategory === "뉴스" && <CurationNews />}
      </CurationWrapper>
    </HomeWrapper>
  );
}

export default Home;
