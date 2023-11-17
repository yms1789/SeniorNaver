import { useEffect, useState } from "react";
import HeadBar from "../components/HeadBar";
import styled from "styled-components";
import item1 from "../assets/images/1.png";
import item2 from "../assets/images/2.png";
import item3 from "../assets/images/3.png";
import item4 from "../assets/images/4.png";
import item5 from "../assets/images/5.png";
import { useNavigate } from "react-router";

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
`;
const IntroAdvertisement2 = styled.div`
  width: 100vw;
  height: 300px;
  background: var(--dark30);
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;
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

const IntroRouterText = styled.div`
  cursor: pointer;
  display: flex;
  font-family: "NanumSquareNeoBold";
  font-size: 36px;
  color: var(--dark01);
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &:last-child {
    &:hover {
      color: var(--aqua02);
    }
  }
  width: 350px;
  white-space: nowrap;
  transition: all 0.25s ease;
  &:hover {
    color: var(--emerald);
  }
`;

const StyledImage = styled.img`
  width: 70%;
  height: 80%;
  opacity: 0; // 초기 투명도를 0으로 설정
  transition: opacity 0.5s ease-in-out; // 투명도가 변하는 속도를 설정
`;

const IntroEmpty = styled.div`
  height: 30vh;
`;
const IntroLast = styled.div`
  height: 200px;
`;
const IntroRouterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 100px;
`;

function Intro() {
  const navigation = useNavigate();
  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <IntroWrapper>
      {/* <IntroAdvertisement></IntroAdvertisement> */}
      <IntroHeaderText>시니어 네이버에 오신 것을 환영합니다</IntroHeaderText>

      <StyledImage
        src={item1}
        alt=""
        style={
          { transform: `translateX(${position / 4}px)`, opacity: position / 10 } // 스크롤 위치에 따라 opacity를 조절
        }
      />
      <IntroEmpty />
      <StyledImage
        src={item2}
        alt=""
        style={{ transform: `translateX(${position / -8}px)`, opacity: position / 1500 }}
      />
      <IntroEmpty />
      {/* <IntroAdvertisement2 /> */}
      <StyledImage
        src={item3}
        alt=""
        style={{ transform: `translateX(${position / 12}px)`, opacity: position / 3000 }}
      />
      <IntroEmpty />
      {/* <IntroAdvertisement /> */}
      <StyledImage
        src={item4}
        alt=""
        style={{ transform: `translateX(${position / -16}px)`, opacity: position / 3500 }}
      />
      <IntroEmpty />
      {/* <IntroAdvertisement2 /> */}
      <StyledImage
        src={item5}
        alt=""
        style={{ transform: `translateX(${position / 20}px)`, opacity: position / 4000 }}
      />
      <IntroLast />
      <IntroRouterWrapper>
        <IntroRouterText onClick={() => navigation("/login")}>로그인 하러 가기</IntroRouterText>
        <IntroRouterText onClick={() => navigation("/home")}>비회원으로 접속하기</IntroRouterText>
      </IntroRouterWrapper>
    </IntroWrapper>
  );
}

export default Intro;
