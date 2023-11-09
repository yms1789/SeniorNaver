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
  // const url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=dZcpr9yM6QZMkL3oTzAh&redirect_uri=http://localhost:5173/oauth/login/oauth2/code/naver&state=1234"

  // 네이버 로그인 ( 프론트에서 토큰 바로 받아오는 경우)
  // const { naver } = window as any;

  // const initializeNaverLogin = () => {
    
  //   const naverLogin = new naver.LoginWithNaverId({
  //     // response_type  : "code",
  //     // clientId: "dZcpr9yM6QZMkL3oTzAh",
  //     // redirect_uri: "https://nid.naver.com/oauth2.0/authorize", 
  //     // state: "RANDOM_STATE",
  //     const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=dZcpr9yM6QZMkL3oTzAh&redirect_uri=https://ggok2.duckdns.org/api/oauth/login/oauth2/code/naver&state=1234';

  //     window.location.replace(url);

  //     // clientId: "dZcpr9yM6QZMkL3oTzAh",
  //     // callbackUrl: "http://localhost:5173/oauth/login/oauth2/code/naver", 
  //     // isPopup: false, // popup 형식으로 띄울것인지 설정
  //     loginButton: { color: 'white', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
  //   });
  //   naverLogin.init();
  // };

  // useEffect(() => {
  //   initializeNaverLogin();
  // }, []);


  return (
        <NaverLoginWrapper onClick={postNaverLogin}>
          <NaverLogo src={naverlogo} id='naverIdLogin' />
          네이버 로그인
        </NaverLoginWrapper>
        
  )};

export default NaverLogin;

