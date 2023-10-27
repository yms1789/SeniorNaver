import styled from "styled-components";
import LocalLogin from "../components/LocalLogin";

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
`;

const Logo = styled.div`
  font-family: "NanumSquare Neo Heavy";
  font-style: normal;
  font-size: 90px;
  font-weight: 1000;
  line-height: 99px;
  letter-spacing: 0.05em;
  color: #000000;
  margin-top: 150px;
  margin-bottom: 50px;
  cursor: pointer;
  user-select: none;
`;

const LoginCopylight = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  justify-content: end;
  font-family: "NanumSquare Neo";
  font-style: normal;
  font-weight: bolder;
  font-size: 12px;
`;
function Login() {
  return (
    <LoginWrapper>
      <Logo>SENIOR NAVER</Logo>
      <LocalLogin />
      <LoginCopylight>Copyright © NAVER Corp. All Rights Reserved.</LoginCopylight>
    </LoginWrapper>
  );
}
export default Login;
