import { useState, useEffect } from "react";
import styled from "styled-components";
import { memeMineCurrentPracticeState } from "../states/useMeme";
import { useRecoilState,useSetRecoilState } from "recoil";
import MemeDictionaryPracticePoseProcessBox from "./MemeDictionaryPracticePoseProcessBox";


const MemeDictionaryPracticeWraaper = styled.div`
  width: 930px;
  height: 100%;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PoseHeadeWraaper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MemeDictionaryPracticeSelectorHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  text-align: center;
  margin-right: 500px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const PoseYearBox = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 36px;
  letter-spacing: -0.05em;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 60px;
  background: var(--maingradient);
  border-radius: 30px;
  margin-left: 20px;
`
const MemeDictionaryHeadline = styled.div`
  width: 900px;
  border: 1px solid var(--dark30);
  margin-bottom: 150px;
` 


function MemeDictionaryPracticePose() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  const setcurrentPage = useRecoilState(memeMineCurrentPracticeState);
  const [clicked, setClicked] = useState(false); 
  
  return (
    <MemeDictionaryPracticeWraaper>
      <PoseHeadeWraaper>
        <MemeDictionaryPracticeSelectorHeader>
          문제 출제      
          <PoseYearBox>{setcurrentPage[0].currentYear}</PoseYearBox>
        </MemeDictionaryPracticeSelectorHeader>
      </PoseHeadeWraaper>
      <MemeDictionaryHeadline/>
      <MemeDictionaryPracticePoseProcessBox/>
    </MemeDictionaryPracticeWraaper>
  )
}
export default MemeDictionaryPracticePose;