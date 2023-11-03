import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { userState, isLoggedInState, login } from "./../states/useLogin";

import styled from "styled-components";
import NaverLogin from "./NaverLogin";

const LoginFormWrapper = styled.div`
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  width: 700px;
  height: 450px;
  left: 370px;
  top: 317px;
  bottom: 3px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const IDInput = styled.input`
  width: 460px;
  height: 80px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0.25);
  font-size: 36px;
  font-weight: 500;
  font-family: "NanumSquare Neo";
  padding: 0 15px 0 15px;
`;

const PasswordInput = styled.input`
  width: 460px;
  height: 80px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0.25);
  font-size: 36px;
  font-weight: 500;
  font-family: "NanumSquare Neo";
  padding: 0 15px 0 15px;
`;

const LoginSubmit = styled.input`
  margin-top: 40px;
  width: 240px;
  height: 80px;
  font-size: 30px;
  border-radius: 30px;
  background: #2e2e2e;
  color: white;
`;

const LoginSubmitWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

function LocalLogin() {
  const [userFormData, setUserFormData] = useState({
    memberId : "",
    password : "" 
  });
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(userFormData);
      setUser(loggedInUser);
      setIsLoggedIn(true);
      navigate("/")
    } catch (error) {
      alert
      console.error(error);
    }
  };


  return (
    <LoginFormWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <IDInput type="text" name="memberId" value={userFormData.memberId} placeholder="아이디" onChange={handleChange}/>
        <PasswordInput placeholder="비밀번호" type="password" name="password" value={userFormData.password} onChange={handleChange} />
        <LoginSubmitWrapper>
          <LoginSubmit className="login" type="submit" value={"로그인"}></LoginSubmit>
          <NaverLogin />
        </LoginSubmitWrapper>
      </LoginForm>
    </LoginFormWrapper>
  );
}

export default LocalLogin;
