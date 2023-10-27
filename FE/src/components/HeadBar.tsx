
import { styled } from "styled-components";
import snlogo from "./../assets/images/snlogo.png";
import { NavLink } from "react-router-dom";

const NavBarWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 120px;
  gap: 10px;
  width: 1440px;
  height: 110px;
  left: calc(50% - 1440px / 2 - 19px);
  top: 0px;
  z-index: 990;
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  min-width: 600px;
  max-width: 1440px;
  height: 110px;
`;

const NavLogo = styled.img`
  display: flex;

  width: 50px;
  height: 50px;
  cursor: pointer;
  user-select: none;
`;

const NavLogoText = styled.div`
  font-family: "NanumSquare Neo";
  font-style: normal;
  font-weight: 900;
  font-size: 34px;
  line-height: 38px;
  margin-left: 20px;
  letter-spacing: 0.05em;
  color: #010101;
  flex: none;
  order: 0;
  flex-grow: 1;
  cursor: pointer;
  user-select: none;
`;

const NavLoginButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  margin-right: 20px;
  position: relative;
  width: 97px;
  height: 46px;
  border: 2px solid #202020;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  background: none;
  transition: all 0.25s ease;

  &:hover {
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;
const NavLoginButtonInnerText = styled.div`
  width: 57px;
  height: 22px;
  font-family: "NanumSquare Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  color: #202020;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: color 0.5s ease;

  ${NavLoginButton}:hover & {
    color: #ffffff;
  }
`;

const NavSigninButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;

  position: relative;
  width: 116px;
  height: 46px;

  border: 2px solid #202020;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s ease;

  &:hover {
    border: 2px solid transparent;
    padding: 15px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;
const NavSigninButtonInnerText = styled.div`
  width: 76px;
  height: 22px;
  font-family: "NanumSquare Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  color: #202020;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: color 0.5s ease;

  ${NavSigninButton}:hover & {
    color: #ffffff;
  }
`;

const NavEmpty = styled.div`
  width: 700px;
`;

function HeadBar() {
  return (
    <NavBarWrapper>
      <NavBar>
        <NavLink to="/">
          <NavLogo src={snlogo} />
        </NavLink>
        <NavLogoText>SENIOR NAVER</NavLogoText>
        <NavEmpty />
        <NavLink to="/login">
          <NavLoginButton>
            <NavLoginButtonInnerText>로그인</NavLoginButtonInnerText>
          </NavLoginButton>
        </NavLink>
        <NavLink to="/signin">
          <NavSigninButton>
            <NavSigninButtonInnerText>회원가입</NavSigninButtonInnerText>
          </NavSigninButton>
        </NavLink>
      </NavBar>
    </NavBarWrapper>
  );
}
export default HeadBar;