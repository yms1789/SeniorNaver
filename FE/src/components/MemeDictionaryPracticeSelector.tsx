import { useState, useEffect } from "react";
import styled from "styled-components";
import { memeMineCurrentPracticeState } from "../states/useMeme";
import { useRecoilState,useSetRecoilState } from "recoil";
import Swal from 'sweetalert2'

const MemeDictionaryPracticeWraaper = styled.div`
  width: 930px;
  height: 100%;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const SelectInnerBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-left: 50px;
  align-items: center;
`
const SelectBox = styled.div`
  cursor: pointer;
  display: flex;
  width: 260px;
  height: 260px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  background: var(--white);
  border-radius: 20px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.15s ease;
  &:hover {
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.25);
    background: var(--gray03);
    color: var(--gray01);
  }
  &:active {
    color: var(--white);
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.55);
  }
`

const MemeDictionaryPracticeSelectorHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  text-align: center;
  margin-right: 600px;
  justify-content: center;
  margin-bottom: 20px;
`

const SelectBoxHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  text-align: center;
  justify-content: center;
  margin-bottom: 50px;
`
const SelectBoxContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 300px;
`
const SelectBoxContent = styled.div`
  width: 800px;
  font-family: "NanumSquareNeoRegular";
  font-size: 40px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const StartSolvingBoxArea = styled.div`
  margin-top: 50px;
`

const StartSolvingBoxWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`


const  StartSolvingBoxDeco = styled.div<IbackgroundColor>`
  position: relative;
  top: -70px;
  width: 180px;
  height: 195px;
  background: ${props => props.clicked ? 'var(--maingradient)' : 'var(--dark30)'};
`

const  StartSolvingBoxDeco2 = styled.div<IbackgroundColor>`
  position: relative;
  top: -70px;
  width: 180px;
  height: 195px;
  background: ${props => props.clicked ? 'var(--decogradient01)' : 'var(--dark30)'};
  `

const  StartSolvingBoxDeco3 = styled.div<IbackgroundColor>`
  position: relative;
  top: -70px;
  width: 180px;
  height: 195px;
  background: ${props => props.clicked ? 'var(--decogradient02)' : 'var(--dark30)'};
`
const StartSolvingBox = styled.div<IbackgroundColor>`
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 300px;
  margin:10px;
  height: 400px;
  color: ${props => props.clicked ? 'var(--dark01)' : 'var(--dark30)'};
  background: ${props => props.clicked ? 'var(--white)' : 'var(--dark30)'};
  border: 1px solid var(--dark30);
  border-radius: 30px;
  font-family: "NanumSquareNeoBold";
  font-size: 40px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  white-space:pre-line;
  cursor: pointer;
  &:hover {
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.25);
    background: var(--gray03);
    color: var(--gray01);
  }
  &:active {
    color: var(--white);
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.55);
  }
`
const MemeDictionaryHeadline = styled.div`
  width: 900px;
  border: 1px solid var(--dark30);
  margin-bottom: 150px;
` 

const yearData = [
  {year: 2000, content:`인터넷의 발전으로 유행어가 쏟아져 내렸던 시기로,"뷁","즐","ㅇ" 등의 유행어가 있었다. `},
  {year: 2010, content:"연도별2 용어 특징을 정리한 글을 이 곳에 작성하여 표시함 연도별 용어 특징을 정리한 글을 이 곳에 작성하여 표시함"},
  {year: 2020, content:"안녕"}
]

interface IbackgroundColor{
  clicked?: boolean;
  backgroundColor?: string;
}


function MemeDictionaryPracticeSelector() {
  const setcurrentPage = useSetRecoilState(memeMineCurrentPracticeState);
  const [selected, setSelected] = useState("풀거나 출제할 연도를 선택하세요"); 
  const [clicked, setClicked] = useState(false); 
  const [year, setYear] = useState(0); 

  const handleSelectYear = (index:number) => { 
    setSelected(yearData[index].content);
    setClicked(true);
    setYear(yearData[index].year)
  }
  const handleSelectType = (index:number) => { 
    if(clicked){
      setcurrentPage({currentPage : index, currentYear: year})    
    }
    else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "먼저 연도를 선택하세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
        padding: "30px"
      });
      return;
    }
  }
  return (
    <MemeDictionaryPracticeWraaper>
      <MemeDictionaryPracticeSelectorHeader>상황별 연습</MemeDictionaryPracticeSelectorHeader>
      <MemeDictionaryHeadline/>
      <SelectBoxWrapper>
            {yearData.map((e, index) => (
            <SelectBoxWrapper key={index} onClick={() => handleSelectYear(index)}> 
              <SelectInnerBoxWrapper>
              <SelectBox/>
              <SelectBoxHeader>{e.year}</SelectBoxHeader>
              </SelectInnerBoxWrapper>
            </SelectBoxWrapper>
          ))} 
      </SelectBoxWrapper>
      <SelectBoxContentWrapper>
          {selected && <SelectBoxContent>{selected}</SelectBoxContent>} 
      </SelectBoxContentWrapper>
      <StartSolvingBoxArea  >
        <StartSolvingBoxWrapper>
          <StartSolvingBox clicked={clicked} onClick={()=>handleSelectType(1)}><StartSolvingBoxDeco clicked={clicked}/>문제 출제</StartSolvingBox> 
          <StartSolvingBox clicked={clicked} onClick={()=>handleSelectType(2)}><StartSolvingBoxDeco2 clicked={clicked}/>랜덤 문제풀이</StartSolvingBox>
          <StartSolvingBox clicked={clicked} onClick={()=>handleSelectType(3)}><StartSolvingBoxDeco3 clicked={clicked}/>선택해서 풀기</StartSolvingBox>
        </StartSolvingBoxWrapper>
      </StartSolvingBoxArea>
    </MemeDictionaryPracticeWraaper>
  )
}
export default MemeDictionaryPracticeSelector;