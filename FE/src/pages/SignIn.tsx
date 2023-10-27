
import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import SignInProcessBox from "../components/SignInProcessBox";
const SignInWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #d9d9d9;
  justify-content: center;
  z-index: 10;
`;
const SignInBox = styled.div`
  margin-top: 180px;
  width: 740px;
  height: 895px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
  z-index: 10;
`;
const SignInInnerBox = styled.div`
  width: 735px;
  height: 895px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 20px;
  z-index: 11;
`;
function SignIn() {
  return (
    <SignInWrapper>
      <HeadBar />
      <SignInBox>
        <SignInInnerBox>
          <SignInProcessBox />
        </SignInInnerBox>
      </SignInBox>
    </SignInWrapper>
  );
}
export default SignIn;
