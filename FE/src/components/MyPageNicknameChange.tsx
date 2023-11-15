import { useState, useEffect } from "react";
import styled from "styled-components";
import profileeditor from "./../assets/images/profileeditor.png";
import mainscreenpingpingeee from "./../assets/images/mainscreenpingpingeee.png"
import { useRecoilValue } from "recoil";
import { userState } from "../states/useUser";
import fetchApi from "../states/fetchApi";
import useQueryDebounce from "../hooks/useDebounceQuery";
import { useSetRecoilState } from "recoil";
import { myPageCategoryState } from "../states/useMyPage";
import Swal from 'sweetalert2'

const MyPageProfileWrapper = styled.div`
  margin: auto;
  padding: 5vw 5vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const MyPageProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 26vw;
  height: 20vh;
  background: var(--white);
  border: 1px solid #000000;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5vh;
  
`
const MyPageNicknameHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 1.8vw;
  margin-bottom: 5vh;

`
const NicknameInput = styled.input`
  width: 20vw;
  height: 8vh;
  font-size: 1.2vw;
  padding: 3vh;
  font-family: "NanumSquareNeoExtraBold";
  text-align: center;
  color: var(--dark01);
  border-radius: 30px;
  border: 1px solid var(--gray02);
  margin-bottom: 2vh;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`
const NicknameWarningText = styled.div`
  font-size: 20px;
  font-family: "NanumSquareNeoExtraBold";
  color: #F33434;
  margin-bottom: 1vh;
  `
const NextButton = styled.div`
  user-select: none;
  margin-top: 50px;
  width: 20vw;
  height: 8vh;
  background: #2e2e2e;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "NanumSquareNeoBold";
  font-size: 44px;
  color: var(--white);
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
function MyPageNicknameChange() {
  const userInfo = useRecoilValue(userState);  
  const setcurrentCategory = useSetRecoilState(myPageCategoryState)
  const [nickname,setNickname] = useState(userInfo.nickname);
  const [nicknameWarning,setNicknameWarning] = useState("");
  const [isPassedNickname,setIsPassedNickname] = useState(false);
  const debouncedNickname = useQueryDebounce(nickname, 200); // 디바운스 처리된 닉네임 값

const handleValidCheckNickname = () => {
    if(nickname){
    fetchApi.post(`api/auth/valid/nickname?nickname=${debouncedNickname}`).then((res) => {
      if(res.data === true){
        setNicknameWarning("사용 가능한 닉네임입니다.");
        setIsPassedNickname(true);
      }
      else{
        setNicknameWarning("이미 사용중인 닉네임입니다.");
        setIsPassedNickname(false);
      }
    })
    }else{
        setNicknameWarning("닉네임을 입력하세요.");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    handleValidCheckNickname();
};


const handleChangeNickname = () => {
  if(isPassedNickname){
  fetchApi.put("api/profile/nickname",{nickname: debouncedNickname}).then(() => {
    setcurrentCategory({ currentCategory: 0 })
  })
}else{
  return
}
}

useEffect(() => {
  handleValidCheckNickname();
}, [debouncedNickname]);

  return (
    <MyPageProfileWrapper>
      <MyPageNicknameHeader>닉네임 재설정</MyPageNicknameHeader>
      <NicknameInput name="nickname" value={nickname} onChange={handleChange}></NicknameInput>
        <NicknameWarningText>{nicknameWarning}</NicknameWarningText>
        <NextButton onClick={handleChangeNickname}>변경 완료</NextButton>
    </MyPageProfileWrapper>
  )
}

export default MyPageNicknameChange;