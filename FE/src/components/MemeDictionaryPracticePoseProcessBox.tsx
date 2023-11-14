import { useState, useEffect } from "react";
import styled from "styled-components";
import { memeMineCurrentPracticeState } from "../states/useMeme";
import { useRecoilState,useSetRecoilState } from "recoil";
import { postProblem } from "../hooks/useMemeQuery";
import posefileformbutton from "./../assets/images/posefileformbutton.png"


const MemeDictionaryPracticeWraaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
// case 0
const MemeDictionaryPracticeText = styled.div`
  display: flex;
  font-family: "NanumSquareNeoBold";
  font-size: 44px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const MemeDictionaryPracticeHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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
const MemeDictionaryPracticeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const MemeDictionaryPracticeFileFormImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MemeDictionaryPracticeFileFormInput = styled.input`
  display: none;
`
const MemeDictionaryPracticeProblemInput = styled.input`
  width: 1100px;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 50px;
  border: 1px solid var(--dark50);
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
`

const MemeDictionaryPracticeProblemExplanatioInput = styled.input`
  width: 1100px;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 32px;
  border: 1px solid var(--dark50);
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
`
const MemeDictionaryPracticeTagInput = styled.input`

  width: 600px;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 32px;
  color: #4a7deb;
  border: 1px solid #4a7deb;
  border-radius: 20px;
  padding: 15px;
  margin-top: 60px;
  margin-bottom: 120px;
`
const MemeDictionaryPracticeReviewInput = styled.input`
  width: 1100px;
  height: 500px;
  text-align: center;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 32px;
  color: #4a7deb;
  border: 1px solid var(--dark50);
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
`

const MemeDictionaryPracticeOptionsInput = styled.input<{ isSelected: boolean }>`
  width: 980px;
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
const ProblemEditorLabel = styled.label`
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

//case2
const MemeDictionaryPracticeCompletedProblem = styled.div`
display: flex;
font-family: "NanumSquareNeoExtraBold";
font-size: 62px;
text-align: center;
justify-content: center;
align-items: center;
color : var(--emerald);
margin-bottom: 100px;
`


function MemeDictionaryPracticePoseProcessBox({useYear}:{useYear:number}) {
  const setcurrentPage = useRecoilState(memeMineCurrentPracticeState);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [problemFile, setProblemFile] = useState<{ url: string; file: File; } | null>(null);
  const [clicked, setClicked] = useState(true); 
  const [completed, setCompleted] = useState(false); 
  const [currentStep, setCurrentStep] = useState(0); 
  const [newProblem, setProblem] = useState({
    title: "",
    image: "",
    answer: 0,
    review: "",
    problemExplanation: "",
    useYear: useYear,
    word: "우짤래미",
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

  useEffect(() => {
    const { title, answer, review, problemExplanation, word, tags, choices } = newProblem;
    if (title && answer && review && problemExplanation && word && tags[0] && choices.every(choice => choice.content)) {
      setCompleted(true);
    } else {
      console.log(newProblem)
      setCompleted(false);
    }
  }, [newProblem]);


  useEffect(()=>{
    window.scrollTo(0, 0);
  },[currentStep])

  const handleNextButtononClick = () => {
  
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === "tags") {
      const tags = value.replace(/#/g, '').split(',').map(tag => '#' + tag.trim());
      setProblem({
        ...newProblem,
        [name]: tags
      });
    } else {
      setProblem({
        ...newProblem,
        [name]: value
      });
    }
  };
  
  const handleChoiceChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChoices = [...newProblem.choices];
    newChoices[index].content = e.target.value;
    setProblem({...newProblem, choices: newChoices});
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList = e.target.files;
    if (imageList && imageList.length > 0) {
      const imageObj = {
        url: URL.createObjectURL(imageList[0]),
        file: imageList[0],
      };
      setProblem({...newProblem, image: imageObj.url});
      setProblemFile(imageObj);
    }
  };

  const handleSubmit= (e:any)=>{
    e.preventDefault();
    postProblem(newProblem);
    // setCurrentStep(2);
  }

  switch (currentStep) {
    case 0:
  return (
    <MemeDictionaryPracticeWraaper>
      <MemeDictionaryPracticeText>문제를 출제할 단어를 선정해주세요</MemeDictionaryPracticeText>
      <MemeDictionaryPracticeHeader>우짤래미</MemeDictionaryPracticeHeader>
      {clicked ? (
        <NextButton onClick={()=> setCurrentStep(1)}>
          <NextButtonText>다음</NextButtonText>
        </NextButton>
      ) : (
        <LockedNextButton >
          <NextButtonText >다음</NextButtonText>
        </LockedNextButton>
      )}
    </MemeDictionaryPracticeWraaper>
  )
  case 1:
    return (
      <MemeDictionaryPracticeWraaper> 
        <MemeDictionaryPracticeProblemInput placeholder="문제 이름을 지어주세요" name="title" value={newProblem.title} onChange={handleChange}/>
        <MemeDictionaryPracticeForm onSubmit={handleSubmit}>
          <MemeDictionaryPracticeFileFormArea>
            
          <MemeDictionaryPracticeFileFormInput id="fileinput" type="file" accept="image/*" onChange={handleImageChange}>
          </MemeDictionaryPracticeFileFormInput>
          <ProblemEditorLabel htmlFor="fileinput">
          <MemeDictionaryPracticeFileFormImage src={problemFile ? problemFile.url : posefileformbutton}/>
          </ProblemEditorLabel>
          </MemeDictionaryPracticeFileFormArea>
            
            <MemeDictionaryPracticeProblemExplanatioInput placeholder="문제 설명을 입력해주세요" name="problemExplanation" value={newProblem.problemExplanation} onChange={handleChange}/>

            <MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeOptionsCircle isSelected={newProblem.answer === 1} onClick={() => setProblem({...newProblem, answer: 1})}>1</MemeDictionaryPracticeOptionsCircle>
            <MemeDictionaryPracticeOptionsInput isSelected={newProblem.answer === 1} placeholder="첫 번째 선지를 입력해주세요" onChange={handleChoiceChange(0)} value={newProblem.choices[0]?.content || ""}/>
            </MemeDictionaryPracticeOptionsWrapper>

            <MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeOptionsCircle isSelected={newProblem.answer === 2} onClick={() => setProblem({...newProblem, answer: 2})}>2</MemeDictionaryPracticeOptionsCircle>
            <MemeDictionaryPracticeOptionsInput isSelected={newProblem.answer === 2} placeholder="두 번째 선지를 입력해주세요" onChange={handleChoiceChange(1)} value={newProblem.choices[1]?.content || ""}/>
            </MemeDictionaryPracticeOptionsWrapper>

            <MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeOptionsCircle isSelected={newProblem.answer === 3} onClick={() => setProblem({...newProblem, answer: 3})}>3</MemeDictionaryPracticeOptionsCircle>
            <MemeDictionaryPracticeOptionsInput isSelected={newProblem.answer === 3} placeholder="세 번째 선지를 입력해주세요" onChange={handleChoiceChange(2)} value={newProblem.choices[2]?.content || ""}/>
            </MemeDictionaryPracticeOptionsWrapper>
            <MemeDictionaryPracticeTagInput 
              placeholder="문제 태그를 적어주세요" 
              name="tags" 
              value={newProblem.tags.join(', ')} 
              onChange={handleChange}
            />
            <MemeDictionaryPracticeHeader>문제 풀이도 적어주세요!</MemeDictionaryPracticeHeader>
            <MemeDictionaryPracticeReviewInput type="text" placeholder="문제 풀이를 입력해주세요" name="review" value={newProblem.review} onChange={handleChange}/>

            {completed ? (
              <NextButton onClick={handleSubmit}>
                <NextButtonText>출제완료</NextButtonText>
              </NextButton>
            ) : (
              <LockedNextButton >
                <NextButtonText >출제완료</NextButtonText>
              </LockedNextButton>
            )}
        </MemeDictionaryPracticeForm>
      </MemeDictionaryPracticeWraaper>
    )
    case 2:
      return (
        <MemeDictionaryPracticeWraaper>
                <MemeDictionaryPracticeCompletedProblem>"하이퍼 우짤래미"</MemeDictionaryPracticeCompletedProblem>
                <MemeDictionaryPracticeHeader>출제 완료!</MemeDictionaryPracticeHeader>
                <MemeDictionaryPracticeText>출제한 문제는 나의 단어장에서 확인 가능합니다.</MemeDictionaryPracticeText>
        </MemeDictionaryPracticeWraaper>
      )
    default:
      break;
    }
}
export default MemeDictionaryPracticePoseProcessBox;