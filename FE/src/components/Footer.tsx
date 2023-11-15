import styled from "styled-components";
import logo from "../assets/logo.png";

const FooterContainerWrapper = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 2vw;
  background-color: var(--dark02);
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1vw;
`;
const LogoWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
`;
const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
`;
const SeniorNaverWrapper = styled.div`
  letter-spacing: 0.05vw;
  color: var(--white);
  font-size: 1.3rem;
  font-family: "NanumSquare Neo Heavy";
`;
const FooterRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
`;
const FooterTextWrapper = styled.div`
  color: var(--gray03);
  font-size: 1rem;
  font-family: "NanumSquare Neo Regular";
`;

function Footer() {
  return (
    <FooterContainerWrapper>
      <LeftWrapper>
        <LogoWrapper href="/home">
          <Logo src={logo} alt="logo" />
          <SeniorNaverWrapper>SENIOR NAVER</SeniorNaverWrapper>
        </LogoWrapper>
        <FooterRowWrapper>
          <FooterTextWrapper>개인정보처리방침</FooterTextWrapper>
          <FooterTextWrapper>|</FooterTextWrapper>
          <FooterTextWrapper>이용약관</FooterTextWrapper>
        </FooterRowWrapper>
      </LeftWrapper>
      <FooterRowWrapper>
        <FooterTextWrapper>기획 개발</FooterTextWrapper>
        <FooterTextWrapper>|</FooterTextWrapper>
        <FooterTextWrapper>꼭꼭 유니버스</FooterTextWrapper>
      </FooterRowWrapper>
    </FooterContainerWrapper>
  );
}

export default Footer;
