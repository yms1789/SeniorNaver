import React from 'react'
import { NavLink } from "react-router-dom";
import roundlogo from "./../assets/images/roundlogo.png";
import styled from "styled-components";
import HeadBar from "./HeadBar";

const CompletedSignUpWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CompletedSignUpText = styled.div`
  font-family: "NanumSquareNeoRegular";
  font-size: 32px;
  color: var(--gray02);
`

const CompletedSignUpHeader = styled.div`
  user-select: none;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 48px;
  color: var(--dark01);
  margin-bottom: 20px;
`

const CompletedSignUpLogo = styled.img`
  user-select: none;
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`
function CompletedSignUp() {
  return (
    <CompletedSignUpWrapper>
      <CompletedSignUpLogo src={roundlogo}  />
      <CompletedSignUpHeader>회원가입을 축하합니다!</CompletedSignUpHeader>
      <NavLink to="/home">
      <CompletedSignUpText>홈으로 가기</CompletedSignUpText>
      </NavLink>
      </CompletedSignUpWrapper>
  )
}

export default CompletedSignUp;