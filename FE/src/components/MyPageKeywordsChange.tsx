import { useState } from "react";
import styled from "styled-components";
import profileeditor from "./../assets/images/profileeditor.png";
import mainscreenpingpingeee from "./../assets/images/mainscreenpingpingeee.png"
import { useRecoilValue } from "recoil";
import { userState } from "../states/useUser";
import { KeywordsData } from "./KeywordsData";

const MyPageProfileWrapper = styled.div`
  margin: auto;
  padding: 5vw 5vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`


const MyPageNicknameHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 1.8vw;
`
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

interface IbackgroundColor{
  clicked?: boolean;
  backgroundColor?: string;
}

interface IKeywordData {
  keywords: string;
  imagepath: string;
}


function MyPageKeywordsChange() {
  const userInfo = useRecoilValue(userState);  
  const [profile, setProfile] = useState<{ url: string; file: File; } | null>(null);
  const [keywords,setKeywords] = useState<string[]>([]);
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

  const handleKeywordsCardClick = (card : IKeywordData) => {
    if (keywords.includes(card.keywords)) {
      setKeywords(keywords.filter(keyword => keyword !== card.keywords));
    } else {
      setKeywords([...keywords, card.keywords]);
    }
  };

  return (
    <MyPageProfileWrapper>
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
        <NextButton>변경 완료</NextButton>

    </MyPageProfileWrapper>
  )
}
export default MyPageKeywordsChange;