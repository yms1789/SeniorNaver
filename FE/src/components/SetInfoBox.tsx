
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { KeywordsData } from "./KeywordsData";
import useQueryDebounce from "../hooks/useDebounceQuery";
import axios from "axios";
import Swal from 'sweetalert2'

import mainscreenpingpingeee from "./../assets/images/mainscreenpingpingeee.png"
import profileeditor from "./../assets/images/profileeditor.png";
import styled from "styled-components";
import koreamap from "./../assets/images/koreamap.png"

const SetInfoBoxWrapper = styled.div`
  margin-top: 100px;
  width: 635px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SetInfoForm = styled.form`
  padding: 50px;
  width: 635px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NextButton = styled.div`
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
const KeywordTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 50px;
`
const KeywordsHeader = styled.div`
  font-family: "NanumSquareNeoBold";
  font-size: 36px;
  color: var(--dark01);
  text-align: center;
  margin-bottom: 10px;
`
const KeywordsInfoText = styled.div`
  font-family: "NanumSquareNeoRegular";
  font-size: 20px;
  text-align: center;
  color: var(--gray01);
`
const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap:15px;
  margin-bottom: 80px;

`;
const KeywordCardWrapper = styled.div<IbackgroundColor>`
  display: flex;
  flex-direction: column;
  width: 160px;  
  height: 180px;
  border-radius: 20px;
  background: ${props => props.clicked ? 'var(--dark01)' : 'var(--maingradient)'};
  margin-bottom: 5px; 
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.clicked ? '2px 4px 4px rgba(0, 0, 0, 0.5);' : ''}; 
  cursor: pointer;
  transition: all 0.35s ease;

  &:hover {
    user-select: none;
    width: 175px;  
    height: 190px;
    border: 2px solid transparent;
    background: var(--gray01)
  }
  &:active {
    user-select: none;
    border: 3px solid rgba(0, 0, 0, 0.3);
  }

`
const KeywordCardImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;    
  overflow-x  : hidden;
  overflow-y  : hidden;
  margin-bottom: 5px;
`
const KeywordCardImage = styled.img`
  width: 100%;
  height: 100%;
`
const KeywordCardText = styled.div`
  font-size: 28px;
  font-family: "NanumSquareNeoExtraBold";
  color: var(--white);
`
const ProfileWrapper = styled.div`
  position: relative;
  display: flex; // 추가
  justify-content: center; 
  align-items: center; 
  background: var(--white);
  width: 190px;
  height: 190px;
  border-radius: 999px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 10;
  margin-bottom: 80px;
  
`
const ProfileImgae = styled.img`
  z-index: 11;
  object-fit: cover;
  width: 190px;
  height: 190px;
  border-radius: 999px;
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
  width: 50px;
  height: 50px;
  z-index: 12;
  cursor: pointer;
`;

const NicknameInput = styled.input`
  width: 300px;
  height: 70px;
  font-size: 24px;
  padding: 30px;
  font-family: "NanumSquareNeoExtraBold";
  text-align: center;
  color: var(--dark01);
  border-radius: 30px;
  border: 1px solid var(--gray02);
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`
const NicknameWarningText = styled.div`
  font-size: 20px;
  font-family: "NanumSquareNeoExtraBold";
  color: #F33434;
  margin-bottom: 80px;
`

const RegionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 25px;
`

const RegionDropdown = styled.select`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 300px;
  height: 70px;
  font-size: 24px;
  font-family: "NanumSquareNeoExtraBold";
  text-align: center;
  color: var(--dark01);
  border-radius: 30px;
  border: 1px solid var(--gray02);
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  option {
  display: flex;
  justify-content: center;
  text-align: center;
  background: var(--white);
  color: var(--);
  padding: 3px 0;
  }
`

const RegionImgae = styled.img`
  width: 400px;
  height: 400px;
`;

interface IbackgroundColor{
  clicked?: boolean;
  backgroundColor?: string;
}

interface IKeywordData {
  keywords: string;
  imagepath: string;
}


function SetInfoBox({meberId}:{meberId : string}) {
  const [keywords,setKeywords] = useState<string[]>([]);
  const [profile, setProfile] = useState<{ url: string; file: File; } | null>(null);
  const [region,setRegion] = useState("");
  const [nickname,setNickname] = useState("");
  const [isPassedNickname,setIsPassedNickname] = useState(false);
  const [nicknameWarning,setNicknameWarning] = useState("");
  const [isRegionClicked,setIsRegionClicked] = useState(false);
  const navigate = useNavigate();
  const debouncedNickname = useQueryDebounce(nickname, 200); // 디바운스 처리된 닉네임 값
  const BaseURL = "/api"

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList = e.target.files;
    if (imageList && imageList.length > 0) {
        const imageObj = {
            url: URL.createObjectURL(imageList[0]),
            file: imageList[0],
        };
        setProfile(imageObj);
        }
  };

  const handleNextButtononClick = () => {
    if(!isPassedNickname){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "닉네임을 확인하세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }
    if(!region){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "지역을 선택하세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }
    if(!keywords){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "키워드를 선택하세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }

    const userDetail = {
      memberId : meberId,
      nickname : nickname,
      region : region,
      keywords : keywords,
    }

    const formData = new FormData();
    if (!profile) {
      formData.append("file", "");
    } else {
        formData.append("file", profile.file);
    }
    formData.append(
      "keywordRequestDto",
      new Blob([JSON.stringify(userDetail)], { type: "application/json" })
    );
      console.log("폼데이터",formData)
    axios.post(`${BaseURL}/auth/details`,formData).then((res)=>{
      if(res.data){
        navigate("/completed");
      }
      else{
        alert("정보전달실패.");
        return;
      }
    })
  };

  const handleKeywordsCardClick = (card : IKeywordData) => {
    if (keywords.includes(card.keywords)) {
      setKeywords(keywords.filter(keyword => keyword !== card.keywords));
    } else {
      setKeywords([...keywords, card.keywords]);
    }
  };

  const handleValidCheckNickname = () => {
    if(nickname){
    axios.post(`${BaseURL}/auth/valid/nickname?nickname=${debouncedNickname}`).then((res) => {
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
  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };
  useEffect(() => {
    handleValidCheckNickname();
    console.log(region)
  }, [debouncedNickname,region]);


  return (
    <SetInfoBoxWrapper>
      <SetInfoForm>
        <KeywordTextWrapper>
        <KeywordsHeader>키워드 설정</KeywordsHeader>
        <KeywordsInfoText>관심있는 분야를 선택하세요!</KeywordsInfoText>
        <KeywordsInfoText>설정하신 분야와 관련한 정보를 제공해드리겠습니다</KeywordsInfoText>
        </KeywordTextWrapper>
        <KeywordsContainer>
          {KeywordsData.map((card, index) => (
            <KeywordCardWrapper key={index}
              clicked={keywords.includes(card.keywords)}
              onClick={() => handleKeywordsCardClick(card)}>
              <KeywordCardImageWrapper>
              <KeywordCardImage src={card.imagepath}/>
              </KeywordCardImageWrapper>
              <KeywordCardText>{card.keywords}</KeywordCardText>
            </KeywordCardWrapper>
          ))}
        </KeywordsContainer>
        <KeywordTextWrapper>
        <KeywordsHeader>프로필 설정</KeywordsHeader>
        <KeywordsInfoText>프로필 사진과 닉네임을 설정하세요!</KeywordsInfoText>
        </KeywordTextWrapper>
        <ProfileWrapper>
        <ProfileEditorInput id="fileinput" type="file" accept="image/*" onChange={handleChangeProfile}/>
        <ProfileEditorLabel htmlFor="fileinput">
        <ProfileEditor src={profileeditor}/>
        </ProfileEditorLabel>
        <ProfileImgae src={profile ? profile.url : mainscreenpingpingeee}/>
        </ProfileWrapper>
        <NicknameInput name="nickname" value={nickname} onChange={handleChange}></NicknameInput>
        <NicknameWarningText>{nicknameWarning}</NicknameWarningText>
        <KeywordsHeader>지역 설정</KeywordsHeader>
          {isRegionClicked&& (
            <RegionWrapper>
              <RegionDropdown value={region} onChange={handleDropdown}>
              <option value='서울'selected>서울</option>
              <option value='부산'>부산</option>
              <option value='대구'>대구</option>
              <option value='인천'>인천</option>
              <option value='광주'>광주</option>
              <option value='대전'>대전</option>
              <option value='울산'>울산</option>
              <option value='강원'>강원</option>
              <option value='경기'>경기</option>
              <option value='경남'>경남</option>
              <option value='경북'>경북</option>
              <option value='전남'>전남</option>
              <option value='전북'>전북</option>
              <option value='제주'>제주</option>
              <option value='충남'>충남</option>
              <option value='충북'>충북</option>
              </RegionDropdown>
            </RegionWrapper>
          )}
          {!isRegionClicked&& (
            <RegionWrapper>
            <KeywordsInfoText>지역별 정보를 제공해드리겠습니다.</KeywordsInfoText>
            <RegionImgae src={koreamap} onClick={()=>{setIsRegionClicked(true)}}/>
            </RegionWrapper>
          )}
        <NextButton onClick={()=>{handleNextButtononClick();}}>회원가입</NextButton>
      </SetInfoForm>
    </SetInfoBoxWrapper>  
  )
}

export default SetInfoBox;