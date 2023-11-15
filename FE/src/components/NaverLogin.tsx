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
  color: var(--white);
  cursor: pointer;
`;

const NaverLogo = styled.img`
  width: 27px;
  margin-right: 15px;
  height: 25px;
`;

declare global {
  interface IWindow {
    naver: any;
  }
}

function NaverLogin() {
  const postNaverLogin = () =>{   
    const url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=dZcpr9yM6QZMkL3oTzAh&redirect_uri=https://ggok2.duckdns.org/api/oauth/login/oauth2/code/naver&state=1234"
    window.location.replace(url);
  }
                                                                                                

  return (
        <NaverLoginWrapper onClick={postNaverLogin}>
          <NaverLogo src={naverlogo} id='naverIdLogin' />
          네이버 로그인
        </NaverLoginWrapper>
        
  )};

export default NaverLogin;

