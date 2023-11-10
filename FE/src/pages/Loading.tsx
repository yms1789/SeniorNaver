import styled from "styled-components";
import Spinner from "../assets/images/spinner.gif";

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 50vh;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem NanumSquareNeoBold;
  text-align: center;
  width: 200px;
`;

function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  );
}

export default Loading;
