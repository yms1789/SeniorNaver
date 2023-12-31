import Lottie from "react-lottie";
import animationData from "../assets/images/loading.json";
import styled from "styled-components";

const RecordingWrapper = styled.div`
  @media screen and (max-width: 425px) {
    max-width: 280px;
  }
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
`;

const RecordingText = styled.h2`
  @media screen and (max-width: 425px) {
    font-size: 28px;
  }
  text-align: center;
  font-size: 40px;
  background: linear-gradient(90deg, #3fd5de, #2deea8); /* 가로 그라데이션 */
  color: transparent; /* 텍스트 색상을 투명하게 만듦 */
  -webkit-background-clip: text; /* 텍스트에만 적용 */
`;

function Recording() {
  const [width, height] = [window.innerWidth, window.innerHeight];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <RecordingWrapper>
      <RecordingText>회원님의 음성을 분석 중입니다.</RecordingText>
      <Lottie
        options={defaultOptions}
        height={width <= 425 ? 300 : 500}
        width={width <= 425 ? 300 : 500}
      />
    </RecordingWrapper>
  );
}

export default Recording;
