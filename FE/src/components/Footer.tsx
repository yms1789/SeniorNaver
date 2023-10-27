import styled from "styled-components";

const P = styled.p`
  margin: 0;
`;
const Div = styled.div`
  position: absolute;
  top: calc(50% - 18px);
  left: calc(50% - 23px);
  font-weight: 800;
`;
const Logo = styled.div`
  position: relative;
  background-color: var(--gray03);
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  flex-shrink: 0;
`;
const SeniorNaver = styled.div`
  position: relative;
  font-size: var(--font-size-9xl);
  letter-spacing: 0.05em;
  font-weight: 800;
  color: var(--white);
  text-align: left;
  -webkit-text-stroke: 0.4px #fff;
`;
const LogoParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const B = styled.b`
  position: relative;
`;
const Parent1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--white);
`;
const FrameGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-lgi);
`;
const FrameParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: var(--padding-29xl) var(--padding-101xl);
`;
const FooterWrapper = styled.footer`
  position: absolute;
  height: 7.05%;
  width: 100%;
  top: 92.95%;
  right: 0rem;
  bottom: 0%;
  left: 0rem;
  background-color: var(--dark02);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  text-align: center;
  font-size: var(--font-size-base);
  color: var(--gray02);
  font-family: var(--font-nanumsquare-neo);
`;

function Footer() {
  return (
    <FooterWrapper>
      <FrameParent>
        <FrameGroup>
          <LogoParent>
            <Logo>
              <Div>
                <P>로고</P>
                <P>이미지</P>
              </Div>
            </Logo>
            <SeniorNaver>SENIOR NAVER</SeniorNaver>
          </LogoParent>
          <Parent1>
            <B>개인정보처리방침</B>
            <B>|</B>
            <B>이용약관</B>
          </Parent1>
        </FrameGroup>
        <Parent1>
          <B>기획 개발</B>
          <B>|</B>
          <B>꼭꼭 유니버스</B>
        </Parent1>
      </FrameParent>
    </FooterWrapper>
  );
}

export default Footer;
