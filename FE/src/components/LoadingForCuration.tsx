import { styled } from "styled-components";
import spinner from "../assets/images/spinner.gif";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoadingTextWrapper = styled.div`
  font: var(--dark50) 1vw NanumSquareNeoBold;
`;
const LoadingImage = styled.img`
  width: 5vw;
`;

function LoadingForCuration() {
  return (
    <LoadingWrapper>
      <LoadingTextWrapper>잠시만 기다려 주세요.</LoadingTextWrapper>
      <LoadingImage src={spinner} alt="로딩중" />
    </LoadingWrapper>
  );
}
export default LoadingForCuration;
