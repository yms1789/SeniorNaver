import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { curationCategoryState } from "../states/curationCategory";
import { upButtonState } from "../states/upButton";
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
import Footer from "../components/Footer";
import { IoIosArrowUp } from "react-icons/io";
import React from "react";

const TotalWrapper = styled.div`
  overflow-x: hidden;
`;
const HomeWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 11vh 2vh 0vw;
  gap: 6vw;
  font-size: 1vw;
  font-family: "NanumSquare Neo ExtraBold";
  overflow-x: hidden;
  color: var(--dark02);
`;
const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
const UpButton = styled.div`
  cursor: pointer;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 3.5rem;
  width: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25rem 0.4rem;
  z-index: 100;
  font-size: 2.5rem;
  border: 3px solid var(--gray04);
  border-radius: 0.7vw;
  background-color: var(--white90);
  transition: all 0.3s ease-in-out;
  &:hover {
    margin: 25.5rem 0.4rem;
  }
`;

function Home() {
  const activeCategory = useRecoilValue(curationCategoryState);
  const [upButton, setUpButton] = useRecoilState(upButtonState);
  const [isTop, setIsTop] = useState(true);
  const { data: dataCarousel, isLoading } = useCurationCarouselQuery();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsTop(scrollTop === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setUpButton(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingForCuration />
      </LoadingWrapper>
    );
  }

  return (
    <TotalWrapper>
      <HeadBar />
      <NavigationBar />
      {!isTop && upButton && (
        <UpButton onClick={scrollToTop}>
          <IoIosArrowUp />
        </UpButton>
      )}
      <HomeWrapper>
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
        <Footer />
      </HomeWrapper>
    </TotalWrapper>
  );
}

export default Home;
