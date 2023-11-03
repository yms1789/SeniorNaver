import HeadBar from "../components/HeadBar";
import styled from "styled-components";
const IntroWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--white);
  z-index: 10;
`;
const IntroInBox = styled.div`
  margin-top: 150px;
  width: 740px;
  height: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
  z-index: 10;
`;

const IntroHeaderText = styled.div`
  font-family: "NanumSquareNeoBold";
  font-size: 36px;
  color: #000000;
  margin-bottom: 30px;
`;
function Intro() {
  return (
    <IntroWrapper>
      <HeadBar />
      <IntroHeaderText>시니어 네이버에 오신 것을 환영합니다</IntroHeaderText>
    </IntroWrapper>
  );
}
export default Intro;
