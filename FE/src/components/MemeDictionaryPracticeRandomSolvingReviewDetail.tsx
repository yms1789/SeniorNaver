import { useState, useEffect } from "react";
import styled from "styled-components";
import posefileformbutton from "./../assets/images/posefileformbutton.png"


const MemeDictionaryPracticeWraaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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


const MemeDictionaryPracticeOptionsInput = styled.div<{ isSelected: boolean }>`
  width: 980px;
  height: 60px;
  font-family: "NanumSquareNeoBold";
  font-size: 28px;
  border: 1px solid var(--dark10);
  border-radius: 20px;
  padding: 15px;
  background: ${props => props.isSelected ? 'var(--maingradient)' : 'white'};
`
const MemeDictionaryPracticeOptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const MemeDictionaryPracticeFileFormArea = styled.div`
  margin-top: 20px;
  width: 1100px;
  height: 500px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray03);
  margin-bottom: 50px;
  overflow: hidden;

`
const MemeDictionaryPracticeOptionsCircle = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeoHeavy";
  text-align: center;
  font-size: 28px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  border: ${props => props.isSelected ? '4px solid var(--aqua)' : '4px solid red;'};
  margin-right: 10px;
  cursor: pointer;
`
const MemeDictionaryPracticeProblemExplanatioInput = styled.div`
  width: 1100px;
  height: 60px;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 32px;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
`
const MemeDictionaryPracticeFileFormImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const MemeDictionaryProblemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 500px;
`
const MemeDictionaryProblemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 55px;
  font-family: "NanumSquareNeoHeavy";
  font-size: 30px;
  background: #3BD9D3;
  border-radius: 20px;
`
const MemeDictionaryProblemTitle = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "NanumSquareNeoRegular";
  font-size: 28px;
`

function MemeDictionaryPracticeRandomSolvingReviewDetail({useYear}:{useYear:number}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState(true); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [newProblem, setProblem] = useState({
      title: "",
      image: "",
      answer: 0,
      review: "",
      problemExplanation: "",
      useYear: useYear,
      word: "",
      tags: [""],
      choices: [
        {
          choiceId: 0,
          choiceNum: 0,
          content: ""
        },
        {
          choiceId: 1,
          choiceNum: 1,
          content: ""
        },
        {
          choiceId: 2,
          choiceNum: 2,
          content: ""
        }
      ]
    });
 
  const handleSubmit= (e:any)=>{
      e.preventDefault();
      setCurrentStep(2);
    }
  
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[currentStep])


      return (
        <MemeDictionaryPracticeWraaper>
          <MemeDictionaryProblemWrapper>
          <MemeDictionaryProblemBox>문제01</MemeDictionaryProblemBox>
          <MemeDictionaryProblemTitle>우짤래미와 타노스</MemeDictionaryProblemTitle>
          </MemeDictionaryProblemWrapper>
          <MemeDictionaryPracticeFileFormArea>
            <MemeDictionaryPracticeFileFormImage src={newProblem.image ? newProblem.image : posefileformbutton}/>
          </MemeDictionaryPracticeFileFormArea>
            <MemeDictionaryPracticeProblemExplanatioInput placeholder="문제 설명을 입력해주세요" >{newProblem.problemExplanation}asdasd</MemeDictionaryPracticeProblemExplanatioInput>
        <MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeOptionsCircle isSelected={newProblem.answer === 1} onClick={() => setProblem({...newProblem, answer: 1})}>1</MemeDictionaryPracticeOptionsCircle>
            <MemeDictionaryPracticeOptionsInput isSelected={newProblem.answer === 1} >{newProblem.choices[0]?.content || ""}</MemeDictionaryPracticeOptionsInput>
        </MemeDictionaryPracticeOptionsWrapper>
        <MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeOptionsCircle isSelected={newProblem.answer === 2} onClick={() => setProblem({...newProblem, answer: 2})}>2</MemeDictionaryPracticeOptionsCircle>
            <MemeDictionaryPracticeOptionsInput isSelected={newProblem.answer === 2} >{newProblem.choices[0]?.content || ""}</MemeDictionaryPracticeOptionsInput>
        </MemeDictionaryPracticeOptionsWrapper>
        <MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeOptionsCircle isSelected={newProblem.answer === 3} onClick={() => setProblem({...newProblem, answer: 3})}>3</MemeDictionaryPracticeOptionsCircle>
            <MemeDictionaryPracticeOptionsInput isSelected={newProblem.answer === 3} >{newProblem.choices[0]?.content || ""}</MemeDictionaryPracticeOptionsInput>
        </MemeDictionaryPracticeOptionsWrapper>
        {completed ? (
              <NextButton onClick={handleSubmit}>
                <NextButtonText>정답제출</NextButtonText>
              </NextButton>
            ) : (
              <LockedNextButton >
                <NextButtonText >정답제출</NextButtonText>
              </LockedNextButton>
            )}
        </MemeDictionaryPracticeWraaper>
      )
  }
export default MemeDictionaryPracticeRandomSolvingReviewDetail;