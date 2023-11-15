import HeadBar from "../components/HeadBar"
import styled from "styled-components";
import MemeNavigationBarForDesktop from "../components/MemeNavigationBarForDesktop";
import MemeDictionaryProcessBox from "../components/MemeDictionaryProcessBox";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MemeDictionaryBackground = styled.div`
  background: var(--gray04);
  height: 100vh;
`
const MemeDictionaryWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: var(--gray04);
  font-size: var(--font-size-base);
  font-family: "NanumSquareNeoExtraBold";
  overflow-x: hidden;
  color: var(--dark02);
  ::-webkit-scrollbar {
    width: 10px; 
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; 
    background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const MemeDictionaryNavWrapper = styled.div`
  flex: 1; 
`
const MemeDictionaryBoxWrapper = styled.div`
    flex: 2; 
`


function MemeDictionary() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 700,
      easing: "ease-in-out",
      once: false,
      delay: 50,
      anchorPlacement: "bottom-top",
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <>
    <HeadBar/>
    <MemeDictionaryWrapper>
      <MemeDictionaryNavWrapper>
      <MemeNavigationBarForDesktop/>
      </MemeDictionaryNavWrapper>
      <MemeDictionaryBoxWrapper>
      <div className="content" data-aos="flip-up">
      <MemeDictionaryProcessBox/>
      </div>
      <MemeDictionaryBackground/>
      </MemeDictionaryBoxWrapper>
    </MemeDictionaryWrapper>
    </>
  )
}

export default MemeDictionary