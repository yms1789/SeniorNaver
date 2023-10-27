import styled from "styled-components";
import naverlogo from "./../assets/images/naversmalllogo.png";

const NaverLoginWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 80px;
  background: #03c75a;
  border-radius: 30px;
  font-size: 24px;
  color: white;
`;

const NaverLogo = styled.img`
  width: 27px;
  margin-right: 10px;
  height: 25px;
`;
function NaverLogin() {
  return (
    <NaverLoginWrapper>
      <NaverLogo src={naverlogo} />
      네이버 로그인
    </NaverLoginWrapper>
  );
}

export default NaverLogin;
