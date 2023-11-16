import { useState, useEffect,Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import posefileformbutton from "./../assets/images/posefileformbutton.png"
import { fetchProblemDetail,postResult, postTotalResult} from "../hooks/useMemeQuery";
import { useSetRecoilState } from "recoil";
import { memeFinalResult } from "../states/useMeme";

const MemeDictionaryPracticeWraaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease;

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
  display: flex;
  align-items: center;
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
  transition: all 0.15s ease;

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
const MemeDictionaryPracticeProblemExplanation = styled.div`
  width: 1100px;
  height: auto;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 32px;
  border-radius: 20px;
  padding: 15px;
  text-overflow: ellipsis;
  align-items: center;
  margin-bottom: 20px;
`
const MemeDictionaryPracticeFileFormImage = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.15s ease;
  object-fit: cover;
`
const MemeDictionaryProblemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 700px;
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
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  font-family: "NanumSquareNeoRegular";
  font-size: 32px;
`
interface IProblemListType {
  problemList: number[];
}
interface IListProps {
  useYear: number;
  problemList: IProblemListType;
  setRandomCurrentStep: Dispatch<SetStateAction<number>>;
}
function MemeDictionaryPracticeRandomSolvingList({useYear, problemList, setRandomCurrentStep}:IListProps) {
  const setFinalResult = useSetRecoilState(memeFinalResult);
  const [completed, setCompleted] = useState(true); 
  const [currentProblem, setCurrentProblem] = useState({
      problemId: "",
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
          choiceNum: 0,
          content: ""
        },
        {
          choiceNum: 1,
          content: ""
        },
        {
          choiceNum: 2,
          content: ""
        }
      ]
    });
    const [problemIndex, setProblemIndex] = useState(0); // 현재 문제의 인덱스를 추적하기 위한 상태
    const [isLastProblem, setIsLastProblem] = useState(false); // 마지막 문제인지 확인하기 위한 상태
    const [choiceResult, setChoiceResult] = useState({
      problemId : "",
      title:"",
      answer : 0,
      choice : 0
    })

    const handleChoice = (index:number) =>{
      setCompleted(true);
      setChoiceResult({...choiceResult, choice: index})
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const result = await postResult(choiceResult.problemId,choiceResult.title,choiceResult.answer, choiceResult.choice); // 문제 결과를 저장합니다.
      if (result) {
        if (problemIndex === problemList.problemList.length - 1) { // 마지막 문제인지 확인
          setIsLastProblem(true);
        } else {
          setProblemIndex(problemIndex + 1); // 다음 문제로 이동
        }
      }
    }

    const handleFinalSubmit = () => {
      postTotalResult().then((data)=>{
        console.log(data)
        setFinalResult(data) 
        setRandomCurrentStep(2);
      })
    }

    useEffect(()=>{
      setChoiceResult({...choiceResult,     problemId : currentProblem.problemId,
        title:currentProblem.title,
        answer : currentProblem.answer})
    },[currentProblem])

  useEffect(() => {
    window.scrollTo(0, 200);
    const problemId = problemList.problemList[problemIndex];
    setCompleted(false);
    setChoiceResult({...choiceResult, choice: 0})
    const fetchProblem = async () => {
      const problem = await fetchProblemDetail(problemId);
      setCurrentProblem(problem);
    }

    fetchProblem();
  }, [problemIndex]);


      return (
        <MemeDictionaryPracticeWraaper>
  
        
        {isLastProblem ? ( 
          <>      
            <MemeDictionaryPracticeProblemExplanation>모든 문제를 풀이하셨습니다.</MemeDictionaryPracticeProblemExplanation>
          <NextButton onClick={handleFinalSubmit}>
        <NextButtonText>최종 결과 보기</NextButtonText> 
          </NextButton>
          </>  
            ) : (
              <>
              <MemeDictionaryProblemWrapper>
                <MemeDictionaryProblemBox>문제0{problemIndex+1}</MemeDictionaryProblemBox> 
                <MemeDictionaryProblemTitle>{currentProblem.title}</MemeDictionaryProblemTitle>
                </MemeDictionaryProblemWrapper>
                <MemeDictionaryPracticeFileFormArea>
                  <MemeDictionaryPracticeFileFormImage src={currentProblem.image ? currentProblem.image : posefileformbutton}/>
                </MemeDictionaryPracticeFileFormArea>
                  <MemeDictionaryPracticeProblemExplanation>{currentProblem.problemExplanation}</MemeDictionaryPracticeProblemExplanation>
              <MemeDictionaryPracticeOptionsWrapper>
                  <MemeDictionaryPracticeOptionsCircle isSelected={choiceResult.choice === 1} onClick={() => handleChoice(1)}>1</MemeDictionaryPracticeOptionsCircle>
                  <MemeDictionaryPracticeOptionsInput isSelected={choiceResult.choice === 1} >{currentProblem.choices[0]?.content || ""}</MemeDictionaryPracticeOptionsInput>
              </MemeDictionaryPracticeOptionsWrapper>
              <MemeDictionaryPracticeOptionsWrapper>
                  <MemeDictionaryPracticeOptionsCircle isSelected={choiceResult.choice === 2} onClick={() => handleChoice(2)}>2</MemeDictionaryPracticeOptionsCircle>
                  <MemeDictionaryPracticeOptionsInput isSelected={choiceResult.choice === 2} >{currentProblem.choices[1]?.content || ""}</MemeDictionaryPracticeOptionsInput>
              </MemeDictionaryPracticeOptionsWrapper>
              <MemeDictionaryPracticeOptionsWrapper>
                  <MemeDictionaryPracticeOptionsCircle isSelected={choiceResult.choice === 3} onClick={() => handleChoice(3)}>3</MemeDictionaryPracticeOptionsCircle>
                  <MemeDictionaryPracticeOptionsInput isSelected={choiceResult.choice === 3} >{currentProblem.choices[2]?.content || ""}</MemeDictionaryPracticeOptionsInput>
              </MemeDictionaryPracticeOptionsWrapper>
                {completed ? (
                  <NextButton onClick={handleSubmit}>
                    <NextButtonText>
                      정답제출
                    </NextButtonText>
                  </NextButton>
                ) : (
                  <LockedNextButton >
                    <NextButtonText>정답제출</NextButtonText>
                  </LockedNextButton>
                )}
                </>
            )}
          </MemeDictionaryPracticeWraaper>
      )
    }

export default MemeDictionaryPracticeRandomSolvingList;