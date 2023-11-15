import { useState } from "react";
import styled from "styled-components";
import profileeditor from "./../assets/images/profileeditor.png";
import mainscreenpingpingeee from "./../assets/images/mainscreenpingpingeee.png"
import { useRecoilValue } from "recoil";
import { userState } from "../states/useUser";

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
  
`
const MyPageNicknameHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 1.8vw;
`

const MyPageNicknameText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoRegular";
  font-size: 1.5vw;
  color: var(--gray02);
  margin-bottom: 3vh;
`
const MyPageHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 1.8vw;
`
const MyPageText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoRegular";
  font-size: 1.5vw;
  color: var(--gray02);
  margin-top: 0.5vh;
  cursor: pointer;
`
const MyPageLine = styled.div`
  display: flex;
  margin-top: 0.2vh;
  border: 0.1vw solid var(--dark30);
  width: 24vw;
  height: 0.01vh;
`
const ProfileWrapper = styled.div`
  position: relative;
  display: flex; 
  background: var(--white);
  width: 12.5vw;
  height: 25vh;
  border-radius: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 10;  
  margin-bottom: 5vh;

`
const ProfileImgae = styled.img`
  z-index: 11;
  object-fit: cover;
  width: 12.5vw;
  height: 25vh;
  border-radius: 100%;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

const ProfileEditorInput = styled.input`
  display: none;
`
const ProfileEditorLabel = styled.label`
`
const ProfileEditor = styled.img`
  position: absolute;
  bottom: 0; 
  right: 0; 
  width: 3vw;
  height: 6vh;
  z-index: 12;
  cursor: pointer;
`;

function MyPageProfile() {
  const userInfo = useRecoilValue(userState);  
  const [profile, setProfile] = useState<{ url: string; file: File; } | null>(null);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList = e.target.files;
    console.log(userInfo)
    if (imageList && imageList.length > 0) {
        const imageObj = {
            url: URL.createObjectURL(imageList[0]),
            file: imageList[0],
        };
        setProfile(imageObj);
        }
  };


  return (
    <MyPageProfileWrapper>
      <ProfileWrapper>
        <ProfileEditorInput id="fileinput" type="file" accept="image/*" onChange={handleChangeProfile}/>
        <ProfileEditorLabel htmlFor="fileinput">
        <ProfileEditor src={profileeditor}/>
        </ProfileEditorLabel>
        <ProfileImgae src={profile ? profile.url : mainscreenpingpingeee}/>
      </ProfileWrapper>
      <MyPageNicknameHeader>{userInfo.nickname}</MyPageNicknameHeader>
      <MyPageText>{userInfo.email}</MyPageText>
      <MyPageProfileBox>
      
      <MyPageHeader>개인정보 재설정</MyPageHeader>
      <MyPageLine/>  
      <MyPageText>닉네임 재설정</MyPageText>
      <MyPageLine/>
      <MyPageText>비밀번호 재설정</MyPageText>

      </MyPageProfileBox>

    </MyPageProfileWrapper>
  )
}
export default MyPageProfile;