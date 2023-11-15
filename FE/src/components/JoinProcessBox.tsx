
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2'
import SetInfoBox from "./SetInfoBox";
import styled from "styled-components";
const JoinBoxWrapper = styled.div`
  margin-top: 100px;
  width: 635px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const JoinEmpty = styled.div`
  margin-bottom: 60px;
`;
const JoinForm = styled.form`
  padding: 50px;
  width: 635px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
`;
const JoinInputBoxWrapper = styled.div`
  width: 557px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const JoinInnerInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
`;
const JoinInputSecondBoxWrapper = styled.div`
  width: 557px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const JoinInputBox = styled.input`
  width: 500px;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeoRegular";
`;
const JoinGenderBoxWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  width: 340px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
const JoinGenderBox = styled.div<{ active: boolean }>`
  width: 157px;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-size: 28px;
  font-family: "NanumSquareNeoExtraBold";
  display: flex;
  align-items: center;
  justify-content: center;
   // 'active' prop에 따라 배경색과 글자색 변경
   background-color:${props => props.active ? "#2e2e2e" : "transparent"};
   color:${props => props.active ? "#ffffff" : "black"};
`;

const NextButton = styled.input`
  user-select: none;
  margin-top: 50px;
  width: 550px;
  height: 80px;
  background: #2e2e2e;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "NanumSquareNeoBold";
  font-size: 44px;
  color: #ffffff;

  cursor: pointer;
  &:hover {
    user-select: none;
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    user-select: none;
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;
const ValidCheckButton = styled.div`
  position: absolute; 
  right: 10px; 
  bottom: 35%; 
  border: 1px solid var(--dark30);
  border-radius: 10px;
  background: var(--maingradient);
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color : var(--dark);
  font-family: "NanumSquareNeoBold";
  font-size: 16px;
  user-select: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    user-select: none;
    padding: 5px;
    background: var(--aqua)
  }
  &:active {
    user-select: none;
    border: 3px solid rgba(255, 255, 255, 0.3);
  }
`

function JoinProcessBox() {
  interface INewUserType {
    memberId : string;
    password :string;
    passwordConfirm :string;
    email : string;
    name : string;
    birth : string;
    gender : string;
    error?: { code: number; message: string };
  }
  const BaseURL = "/api"
  const signupMutation = useMutation((newUser: INewUserType) =>
    axios.post(`${BaseURL}/auth/signup`, newUser)
  );
  
  const [newUser, setNewUser] = useState<INewUserType>({
    memberId : "",
    password :"",
    passwordConfirm :"",
    email : "",
    name : "",
    gender : "",
    birth : "",
  });

  const [isStep,SetStep] = useState(0);
  const [isIdPassed,SetIdPassed] = useState(false);
  const [isEmailPassed,SetEmailPassed] = useState(false);

  const handleManButtonClick = () => {
    setNewUser(prevState => ({ ...prevState, gender: "man" }));
  };

  const handleWomanButtonClick = () => {
    setNewUser(prevState => ({ ...prevState, gender: "woman" }));
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
        ...newUser,
        [e.target.name]: e.target.value
    });
    if(e.target.name === "memberId"){
      SetIdPassed(false);
    }
  };

  
  const handleValidCheckId= ()=>{
    if (!newUser.memberId) {
      Swal.fire({
          position: "center",
          icon: "error",
          title: "아이디를 입력하세요.",
          showConfirmButton: false,
          timer: 1500,
          background: "var(--white)",
          color: "var(--dark01)",
          width: "500px",
          padding: "30px"
        });
      return;
    }
    axios.post(`${BaseURL}/auth/valid/memberId?memberId=${newUser.memberId}`).then((res)=>{
      console.log(newUser.memberId);
      if(res.data){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "사용 가능한 아이디 입니다.",
          
          showConfirmButton: false,
          timer: 1500,
          background: "var(--white)",
          color: "var(--dark01)",
          width: "500px",
        });
        SetIdPassed(true);
      }
      else{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "이미 사용 중인 아이디 입니다.",
          showConfirmButton: false,
          timer: 1500,
          background: "var(--white)",
          color: "var(--dark01)",
          width: "500px",
          padding: "30px"
        });
        SetIdPassed(false);
      }
    })
  }

  const handleSubmit= (e:any)=>{
    e.preventDefault();
    if (!newUser.memberId || !newUser.password || !newUser.email || !newUser.name || !newUser.birth || !newUser.gender) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "모든 항목을 작성하세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }
    if (!newUser.email.includes("@")){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "이메일에는 '@'가 포함되어야 합니다.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "600px",
        padding: "30px"
      });
      return;
    }
    if (newUser.password !== newUser.passwordConfirm) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "비밀번호가 일치하지 않습니다.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }
    if (!isIdPassed) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "아이디 중복체크를 해주세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }
      signupMutation.mutate(newUser, {
        onSuccess: () => {
          SetStep(1);
        },
        onError: (error: any) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "회원가입에 실패했습니다.",
            showConfirmButton: false,
            timer: 1500,
            background: "var(--white)",
            color: "var(--dark01)",
            width: "500px",
            padding: "30px"
          });
        }
      });
  }


  switch (isStep) {
    case 0:
        return (
    <JoinBoxWrapper>
      <JoinForm onSubmit={handleSubmit}>
        <JoinInputBoxWrapper>
        <JoinInnerInputWrapper>
        <JoinInputBox placeholder="아이디" type="id" name="memberId" value={newUser.memberId} onChange={handleChange}  />
        <ValidCheckButton onClick={handleValidCheckId}>중복확인</ValidCheckButton>
        </JoinInnerInputWrapper>
        <JoinInputBox placeholder="비밀번호" type="password" name="password" value={newUser.password} onChange={handleChange} />
        <JoinInputBox placeholder="비밀번호 확인" type="password" name="passwordConfirm" value={newUser.passwordConfirm} onChange={handleChange} />
        <JoinInputBox placeholder="이메일" type="email" name="email" value={newUser.email} onChange={handleChange} />
        </JoinInputBoxWrapper>
        <JoinEmpty />
        <JoinInputSecondBoxWrapper>
        <JoinInputBox placeholder="이름" type="text" name="name" value={newUser.name} onChange={handleChange} />
        <JoinInputBox placeholder="생년월일(예:19900101)" name="birth" type="date"  value={newUser.birth} onChange={handleChange} />
        </JoinInputSecondBoxWrapper>
        <JoinGenderBoxWrapper>
        <JoinGenderBox active={newUser.gender === "man"}  onClick={handleManButtonClick}>남성
          </JoinGenderBox>
          <JoinGenderBox active={newUser.gender === "woman"} onClick={handleWomanButtonClick}>
            여성
          </JoinGenderBox>
        </JoinGenderBoxWrapper>
        <NextButton onClick={handleSubmit} data-testid= "dkdk" value={"다음"} type="submit">
        </NextButton>
      </JoinForm>
      <JoinEmpty />
    </JoinBoxWrapper>
  )
  case 1:
    return (
      <SetInfoBox meberId={newUser.memberId}/>
    )
    default:
      break;
  }}
  
export default JoinProcessBox;
