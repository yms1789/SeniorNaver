import Lottie from "react-lottie";
import animationData from "../assets/images/loading.json";
import styled from "styled-components";

const RecordingWrapper = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
`;

const RecordingText = styled.h2`
  text-align: center;
`;

function Recording() {
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
      <Lottie options={defaultOptions} height={400} width={400} />
    </RecordingWrapper>
  );
}

export default Recording;
