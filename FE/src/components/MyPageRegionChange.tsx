import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "../states/useUser";
import koreamap from "./../assets/images/koreamap.png"

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
  margin-bottom: 5vh;
`

const KeywordsInfoText = styled.div`
  font-family: "NanumSquareNeoRegular";
  font-size: 20px;
  text-align: center;
  color: var(--gray01);
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

const RegionImgae = styled.img`
  width: 400px;
  height: 400px;
`;

function MyPageRegionChange() {
  const [isRegionClicked,setIsRegionClicked] = useState(false);
  const [region,setRegion] = useState("");
  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };
  return (
    <MyPageProfileWrapper>
      <MyPageNicknameHeader>지역 재설정</MyPageNicknameHeader>
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
          <NextButton>변경 완료</NextButton>

    </MyPageProfileWrapper>
  )
}
export default MyPageRegionChange;