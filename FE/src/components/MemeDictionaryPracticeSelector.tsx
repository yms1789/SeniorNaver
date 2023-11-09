import { useState, useEffect } from "react";
import styled from "styled-components";
import { memeMineCurrentPracticeState } from "../states/useMeme";
import { useRecoilState,useSetRecoilState } from "recoil";
import AOS from "aos";
import "aos/dist/aos.css";


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
const StartSolvingBoxLabel = styled.div`
  width: 100vw;
  height: 450px;
  background: var(--aqua);
  margin-bottom: 80px;
`

const  StartSolvingBoxDeco = styled.div`
  position: relative;
  top: -70px;
  width: 180px;
  height: 195px;
  background: var(--maingradient);
`

const  StartSolvingBoxDeco2 = styled.div`
  position: relative;
  top: -70px;
  width: 180px;
  height: 195px;
  background: linear-gradient(152.33deg, #cc85f5 6.96%, #44F0B2 88.63%);
  `

const  StartSolvingBoxDeco3 = styled.div`
  position: relative;
  top: -70px;
  width: 180px;
  height: 195px;
  background: linear-gradient(152.33deg, #85A4F5 6.96%, #44F0B2 88.63%);
`
const StartSolvingBox = styled.div`
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 300px;
  margin:10px;
  height: 400px;
  background: var(--white);
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

function MemeDictionaryPracticeSelector() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 200,
      easing: "ease-in-out",
      once: true,
      delay: 0,
      anchorPlacement: "top-bottom",
    });

    return () => {
      AOS.refresh();
    };
  }, []);
  const setcurrentPage = useSetRecoilState(memeMineCurrentPracticeState);
  const [selected, setSelected] = useState("풀거나 출제할 연도를 선택하세요"); 
  const [clicked, setClicked] = useState(false); 
  const [year, setYear] = useState(0); 

  const handleSelect = (index:number) => { 
    setSelected(yearData[index].content);
    setClicked(!clicked);
    setYear(yearData[index].year)
  }

  return (
    <MemeDictionaryPracticeWraaper>
      <MemeDictionaryPracticeSelectorHeader>상황별 연습</MemeDictionaryPracticeSelectorHeader>
      <MemeDictionaryHeadline/>
      <SelectBoxWrapper>
            {yearData.map((e, index) => (
            <SelectBoxWrapper key={index} onClick={() => handleSelect(index)}> 
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
      {clicked &&
// className="content" data-aos="fade-down"
      <StartSolvingBoxArea  >
      {/* <StartSolvingBoxLabel/> */}
        <StartSolvingBoxWrapper className="content" data-aos="fade-down">
          <StartSolvingBox onClick={()=> setcurrentPage({currentPage : 1, currentYear: year})}><StartSolvingBoxDeco/>문제 출제</StartSolvingBox> 
          <StartSolvingBox onClick={()=> setcurrentPage({currentPage : 2, currentYear: year})}><StartSolvingBoxDeco2/>랜덤 문제풀이</StartSolvingBox>
          <StartSolvingBox onClick={()=> setcurrentPage({currentPage : 3, currentYear: year})}><StartSolvingBoxDeco3/>선택해서 풀기</StartSolvingBox>
        </StartSolvingBoxWrapper>
      </StartSolvingBoxArea>}
    </MemeDictionaryPracticeWraaper>
  )
}
export default MemeDictionaryPracticeSelector;