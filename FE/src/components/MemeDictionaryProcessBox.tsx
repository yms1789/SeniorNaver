import styled from "styled-components"
import MemeDictionaryTodayMeme from "./MemeDictionaryTodayMeme"
import MemeDictionaryBook from "./MemeDictionaryBook";
import MemeDictionaryPractice from "./MemeDictionaryPractice";
import MemeDictionaryMine from "./MemeDictionaryMine";
import MemeDictionaryDetail from "./MemeDictionaryDetail";
import { useRecoilState } from "recoil";
import { memeCurrentTapState } from "../states/useMeme";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MemeDictionaryProcessBoxWrapper = styled.div`
  margin-top: 200px;
  justify-content: flex-start;
  align-items: center;
  width: 1400px;
  padding: 80px;
  height: 100%;
  overflow-x: hidden;
  background: var(--white);
  border: 1px solid var(--dark01);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  left: calc(50% - 1110px/2 + 117px);
  top: 200px;
  zoom: 65%;
  @media screen and (max-width: 768px) {
    zoom: 50%;
    top: 400px;
  }
  @media screen and (max-width: 391px) {
    zoom: 30%;
    top: 1000px;
  }
`

function MemeDictionaryProcessBox() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 250,
      easing: "ease-in-out",
      once: false,
      delay: 50,
      anchorPlacement: "bottom-top",
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  const currentTab = useRecoilState(memeCurrentTapState);
  switch (currentTab[0].currentPage) {
    case 0:
  return (
    <MemeDictionaryProcessBoxWrapper> 
      <MemeDictionaryTodayMeme/>
    </MemeDictionaryProcessBoxWrapper>
  )
  case 1:
    return (
      <div className="content" data-aos="fade-left">
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryPractice/>
      </MemeDictionaryProcessBoxWrapper>
      </div>

    )
  case 2:
    return (
      <div className="content" data-aos="fade-left">
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryBook/>
      </MemeDictionaryProcessBoxWrapper>
      </div>
    )
  case 3:
    return (
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryMine/>
      </MemeDictionaryProcessBoxWrapper>
    )
  case 4:
    return (
      <div className="content" data-aos="fade-left">
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryDetail/>
      </MemeDictionaryProcessBoxWrapper>
      </div>
    )
  default:
  break;
}
}

export default MemeDictionaryProcessBox