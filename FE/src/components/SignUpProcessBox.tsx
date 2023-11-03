
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import checkbutton from "./../assets/images/check.png";
import checkedbutton from "./../assets/images/checked.png";
import PersonalInfoText from "./PersonalInfoText";
import PolicyText from "./PolicyText";
const ProcessBoxWrapper = styled.div`
  width: 580px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProcessEmpty = styled.div`
  padding: 20px;
`;
const ProcessCheckButton = styled.img`
  width: 44px;
  height: 44px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 30px;
`;
const ProcessButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
`;
const ProcessCheckText = styled.div`
  margin-left: 10px;
  font-family: "NanumSquareNeoBold";
  font-size: 36px;
  color: #000000;
  margin-bottom: 30px;
`;
const ProcessPolicyBox = styled.div`
  width: 510px;
  height: 150px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  ::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
    /* background: #5f5f5f; */
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const ProcessPolicyTextBox = styled.div`
  padding: 10px;
  width: 480px;
  height: 130px;
  overflow-y: scroll;
`;
const ProcessUniqueText = styled.div`
  display: flex;
  margin-left: 15px;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeoBold";
  font-size: 24px;
  color: #ff2834;
  margin-bottom: 30px;
`;
const ProcessHeaderText = styled.div`
  font-family: "NanumSquareNeoBold";
  font-size: 24px;
  color: #000000;
  margin-bottom: 10px;
`;
const ProcessBodyText = styled.div`
  font-family: "NanumSquareNeoRegular";
  font-size: 16px;
  color: #6c6c6c;
  line-height: 18px;
`;
const LockedNextButton = styled.div`
  margin-top: 60px;
  width: 550px;
  height: 80px;
  background: #bcbcbc;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NextButton = styled.div`
  margin-top: 60px;
  width: 550px;
  height: 80px;
  background: #2e2e2e;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;
const NextButtonText = styled.div`
  user-select: none;
  border-radius: 30px;
  text-align: center;
  font-family: "NanumSquareNeoBold";
  font-size: 44px;
  color: #ffffff;
`;
function SignUpProcessBox() {
  const [nowCheckAll, setCheckAll] = useState(false);
  const [nowCheckFirst, setCheckFirst] = useState(false);
  const [nowCheckSecond, setCheckSecond] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setCheckAll(!nowCheckAll); // 현재 상태의 반대 값을 설정
    setCheckFirst(true);
    setCheckSecond(true);
  };
  const handleFirstButtonClick = () => {
    setCheckFirst(!nowCheckFirst); // 현재 상태의 반대 값을 설정
  };
  const handleSecondButtonClick = () => {
    setCheckSecond(!nowCheckSecond); // 현재 상태의 반대 값을 설정
  };
  const handleNextButtononClick = () => {
    navigate("/join");
  };
  return (
    <ProcessBoxWrapper>
      <ProcessButtonWrapper>
        <ProcessCheckButton
          src={nowCheckAll ? checkedbutton : checkbutton} // 상태에 따라 이미지 변경
          onClick={handleButtonClick}
        />
        <ProcessCheckText>전체 동의하기</ProcessCheckText>
      </ProcessButtonWrapper>
      <ProcessEmpty />
      <ProcessButtonWrapper>
        <ProcessCheckButton
          src={nowCheckFirst ? checkedbutton : checkbutton} // 상태에 따라 이미지 변경
          onClick={handleFirstButtonClick}
        />
        <ProcessUniqueText>[필수]</ProcessUniqueText>
        <ProcessCheckText>시니어 네이버 이용약관 </ProcessCheckText>
      </ProcessButtonWrapper>
      <ProcessPolicyBox>
        <ProcessPolicyTextBox>
          <ProcessHeaderText>여러분을 환영합니다. </ProcessHeaderText>
          <ProcessBodyText>
            <PolicyText />
          </ProcessBodyText>
        </ProcessPolicyTextBox>
      </ProcessPolicyBox>
      <ProcessEmpty />
      <ProcessButtonWrapper>
        <ProcessCheckButton
          src={nowCheckSecond ? checkedbutton : checkbutton} // 상태에 따라 이미지 변경
          onClick={handleSecondButtonClick}
        />
        <ProcessUniqueText>[필수]</ProcessUniqueText>
        <ProcessCheckText>개인정보 수집 및 이용</ProcessCheckText>
      </ProcessButtonWrapper>
      <ProcessPolicyBox>
        <ProcessPolicyTextBox>
          <ProcessHeaderText>개인정보 동의 안내 </ProcessHeaderText>
          <ProcessBodyText>
            <PersonalInfoText />
          </ProcessBodyText>
        </ProcessPolicyTextBox>
      </ProcessPolicyBox>
      {nowCheckFirst && nowCheckSecond ? (
        <NextButton onClick={handleNextButtononClick}>
          <NextButtonText>다음</NextButtonText>
        </NextButton>
      ) : (
        <LockedNextButton>
          <NextButtonText>다음</NextButtonText>
        </LockedNextButton>
      )}
    </ProcessBoxWrapper>
  );
}
export default SignUpProcessBox;
