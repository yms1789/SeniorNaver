import { useEffect, useState } from "react";
import HeadBar from "../components/HeadBar";
import styled from "styled-components";
import item1 from "../assets/images/1.png";
import item2 from "../assets/images/2.png";
import item3 from "../assets/images/3.png";
import item4 from "../assets/images/4.png";
import item5 from "../assets/images/5.png";


const IntroWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
`;

const IntroAdvertisement = styled.div`
  width: 100vw;
  height: 600px;
  background: var(--dark01);
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

`

const IntroHeaderText = styled.div`
  display: flex;
  font-family: "NanumSquareNeoBold";
  font-size: 36px;
  color: var(--dark01);
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-bottom: 200px;
`;

const StyledImage = styled.img`
  width: 70%;
  height: 80%;
  opacity: 0; // 초기 투명도를 0으로 설정
  transition: opacity 0.5s ease-in-out; // 투명도가 변하는 속도를 설정
`;

const IntroEmpty = styled.div`
  height: 30vh;
`

function Intro() {
  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <IntroWrapper>
      <HeadBar />
      <IntroAdvertisement ></IntroAdvertisement>
      <IntroHeaderText>시니어 네이버에 오신 것을 환영합니다</IntroHeaderText>

        <StyledImage 
          src={item1} 
          alt="" 
          style={{ transform: `translateX(${position / 4}px)`, opacity: position / 10} // 스크롤 위치에 따라 opacity를 조절
        } 
        />
        <IntroEmpty/>
        <StyledImage 
          src={item2} 
          alt="" 
          style={{ transform: `translateX(${position / -8}px)`, opacity: position / 1500}} 
        />
        <IntroEmpty/>
        <StyledImage 
          src={item3} 
          alt="" 
          style={{ transform: `translateX(${position / 12}px)`, opacity: position / 3000}} 
        />
        <IntroEmpty/>
        <StyledImage 
          src={item4} 
          alt="" 
          style={{ transform: `translateX(${position / -16}px)`, opacity: position / 4000}} 
        />
        <IntroEmpty/>
        <StyledImage 
          src={item5} 
          alt="" 
          style={{ transform: `translateX(${position / 20}px)`, opacity: position / 5000}} 
        />
        <IntroEmpty/>
      <IntroHeaderText>시니어 네이버에 오신 것을 환영합니다</IntroHeaderText>
    </IntroWrapper>
  );
}

export default Intro;
