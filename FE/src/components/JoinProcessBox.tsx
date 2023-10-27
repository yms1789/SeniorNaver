
import { useState } from "react";
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
const JoinGenderBox = styled.div`
  width: 157px;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-size: 28px;
  font-family: "NanumSquareNeoExtraBold";
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ active }) => (active ? "#2e2e2e" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "black")};
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
  margin-bottom: 80px;
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
function JoinProcessBox() {
  const [gender, setGender] = useState("");
  const handleManButtonClick = () => {
    setGender("man");
  };
  const handleWomanButtonClick = () => {
    setGender("woman");
  };
  return (
    <JoinBoxWrapper>
      <JoinForm>
        <JoinInputBoxWrapper>
          <JoinInputBox placeholder="아이디" />
          <JoinInputBox placeholder="비밀번호" type="password" />
          <JoinInputBox placeholder="비밀번호 확인" type="password" />
          <JoinInputBox placeholder="이메일" type="email" />
        </JoinInputBoxWrapper>
        <JoinEmpty />
        <JoinInputSecondBoxWrapper>
          <JoinInputBox placeholder="이름" />
          <JoinInputBox placeholder="생년월일 (예:19900101)" type="date" />
        </JoinInputSecondBoxWrapper>
        <JoinGenderBoxWrapper>
          <JoinGenderBox active={gender === "man"} onClick={handleManButtonClick}>
            남성
          </JoinGenderBox>
          <JoinGenderBox active={gender === "woman"} onClick={handleWomanButtonClick}>
            여성
          </JoinGenderBox>
        </JoinGenderBoxWrapper>
      </JoinForm>
      <JoinEmpty />
      <NextButton>
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </JoinBoxWrapper>
  );
}
export default JoinProcessBox;
