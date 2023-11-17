import { useState, useEffect } from "react";
import styled from "styled-components";
import MemeDictionaryPracticeRandomSolvingList from "./MemeDictionaryPracticeRandomSolvingList";
import { fetchRandomProblem } from "../hooks/useMemeQuery";
import { useRecoilValue } from "recoil";
import { memeFinalResult } from "../states/useMeme";
import facebookemoji from "./../assets/images/facebook-emoji.gif"

const MemeDictionaryPracticeWraaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease;
`

const MemeDictionaryPracticeText = styled.div`
  display: flex;
  font-family: "NanumSquareNeoBold";
  font-size: 36px;
  text-align: center;
  justify-content: center;
  align-items: center;
  user-select: none;
`
const MemeDictionaryPracticeStartText = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 40px;
  text-align: center;
  justify-content: center;
  align-items: center;
  user-select: none;
  color: var(--white);
  margin-top: 100px;
`

const MemeDictionaryPracticeTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const MemeDictionaryPracticeTextRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const MemeDictionaryPracticeHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  user-select: none;
`

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

/// case 1
const MemeDictionaryPracticeInfoWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MemeDictionaryPracticeInfoBox = styled.div`
  width: 900px;
  height: 800px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--decogradient01);
  margin-bottom: 130px;
  transition: all 0.15s ease;
  cursor: pointer;
  &:hover {
    border: 2px solid transparent;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
    opacity: 0.5;
    border-radius: 30%;

  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-radius: 30px;

  }
`
const MemeResultListBox = styled.div<{ isCorrect: boolean }>`
  width: 760px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.isCorrect ? 'var(--maingradient)' : 'var(--redgradient)'};
  border-radius: 15px;
  border: 3px solid var(--dark01);
  margin-bottom: 15px;
  margin-top: 20px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
`
const MemeDictionaryPracticeResultText = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 36px;
  text-align: center;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-bottom : 50px;
`
const MemeDictionaryPracticeResultText2 = styled.div`
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  font-family: "NanumSquareNeoHeavy";
  font-size: 40px;
  text-align: center;
  color: #26E388;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 150px;
  height: 70px;
  border-radius: 20px;
  padding: 10px;
  background: var(--dark01);
  margin-bottom : 50px;
`
const MemeDictionaryPracticeResultText3 = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 40px;
  text-align: center;
  color: var(--dark50);
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-bottom : 50px;
`
const ResultImage = styled.img`
  z-index: 11;
  object-fit: cover;
  width: 190px;
  height: 190px;
  border-radius: 999px;
  margin-bottom: 50px;
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

const MemeResultListBoxHeader = styled.div`
  display: flex;
  user-select: none;
  border-radius: 24px;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 44px;
  color: var(--dark01);
`
const MemeResultListBoxTitle = styled.div`
  margin-left: 50px;
  display: flex;
  user-select: none;
  border-radius: 30px;
  text-align: center;
  font-family: "NanumSquareNeoHeavy";
  font-size: 44px;
  color: var(--dark01);
`



interface IProblemListType {
  problemList: number[];
}

function MemeDictionaryPracticeRandomSolvingProcessBox({useYear}:{useYear:number}) {
  const [problemList, setProblemList] = useState<IProblemListType>({problemList: []});
  const [currentStep, setCurrentStep] = useState(0); 
  const finalResultObject = useRecoilValue(memeFinalResult);
  const finalResult = finalResultObject.problemList

  useEffect(() => {
      fetchRandomProblem(useYear).then((data) => { 
        setProblemList(data); 
      });
    }, [useYear]);
    
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[currentStep])

  switch (currentStep) {
  case 0:
    return (
      <MemeDictionaryPracticeWraaper> 
        <MemeDictionaryPracticeInfoWrapper>
          <MemeDictionaryPracticeInfoBox onClick={()=>{setCurrentStep(1)}}>
          <MemeDictionaryPracticeTextWrapper>
          <MemeDictionaryPracticeHeader>문제 랜덤 풀이</MemeDictionaryPracticeHeader>
          <MemeDictionaryPracticeText>선택하신 연도의 단어 문제가 무작위로 출제됩니다.</MemeDictionaryPracticeText>
          <MemeDictionaryPracticeText>문제풀이는 총 1세트 1문제로 진행됩니다.</MemeDictionaryPracticeText>
          <MemeDictionaryPracticeText>제시된 문제와 그림을 잘 보고, </MemeDictionaryPracticeText>
          <MemeDictionaryPracticeText>가장 적절한 답을 골라주세요.</MemeDictionaryPracticeText>
          <MemeDictionaryPracticeStartText>준비가 됐으면 눌러주세요!</MemeDictionaryPracticeStartText>
          </MemeDictionaryPracticeTextWrapper>
          </MemeDictionaryPracticeInfoBox>
        </MemeDictionaryPracticeInfoWrapper>
      </MemeDictionaryPracticeWraaper>
    )
    case 1:
      return (
        <MemeDictionaryPracticeWraaper>
          <MemeDictionaryPracticeRandomSolvingList setRandomCurrentStep={setCurrentStep} problemList={problemList} useYear={useYear}></MemeDictionaryPracticeRandomSolvingList>
        </MemeDictionaryPracticeWraaper>
      )
      case 2:
        if (!finalResult|| !Array.isArray(finalResult)) {
          return <div>Loading...</div>
        } else {
          const correctCount = finalResult.filter(problem => problem.answer).length;
          return (
            <MemeDictionaryPracticeWraaper>
              <MemeDictionaryPracticeWraaper>
                <MemeDictionaryPracticeHeader>풀이 결과</MemeDictionaryPracticeHeader>
                <ResultImage src={facebookemoji}/>
                <MemeDictionaryPracticeTextRowWrapper>
                <MemeDictionaryPracticeResultText3>{finalResult.length}문제 중  </MemeDictionaryPracticeResultText3>
                <MemeDictionaryPracticeResultText2>{correctCount}문제</MemeDictionaryPracticeResultText2>
                <MemeDictionaryPracticeResultText>맞췄습니다!</MemeDictionaryPracticeResultText>
                </MemeDictionaryPracticeTextRowWrapper>
                {finalResult.map((problem, index) => (
                  <MemeResultListBox isCorrect={problem.answer} key={index}>
                    <MemeDictionaryPracticeTextRowWrapper>
                      <MemeResultListBoxHeader>{`문제${index + 1}`}</MemeResultListBoxHeader>
                      <MemeResultListBoxTitle>{problem.title}</MemeResultListBoxTitle>
                    </MemeDictionaryPracticeTextRowWrapper>
                  </MemeResultListBox>
                ))}
              </MemeDictionaryPracticeWraaper>
            </MemeDictionaryPracticeWraaper>
          )
        }
      
    default:
      break;
    }
}
export default MemeDictionaryPracticeRandomSolvingProcessBox;