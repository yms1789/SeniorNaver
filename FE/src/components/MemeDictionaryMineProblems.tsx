import styled from "styled-components";
import { useRecoilState,useSetRecoilState } from "recoil";
import MemeDictionaryMineProblemsList from "./MemeDictionaryMineProblemsList";
import { memeMineCurrentCategoryState } from "../states/useMeme";
import minebackground from "./../assets/images/minebackground.png"

const MemeDictionaryMineWraaper = styled.div`
  margin-top: 50px;
  width: 930px;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 300px;

`

const MemeDictionaryMineProblemsHeader = styled.div`
  margin-top: 150px;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 60px;
  text-align: center;
  margin-bottom: 10px;
  user-select: none;
`
const MemeDictionaryMineProblemsHeadline = styled.div`
  width: 850px;
  border: 1px solid var(--dark01);
` 
const MemeDictionaryMineProblemsListArea = styled.div`
  margin-top: 200px;
  width: 900px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MineBackground = styled.div`
  background-image: url(${minebackground}); 
  background-size: cover;
  width: 1103px;
  height: 905px;
`;

function MemeDictionaryMineProblems() {
  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  return (
    // <MineBackground>
    <MemeDictionaryMineWraaper>
      <MemeDictionaryMineProblemsHeader>출제한 문제</MemeDictionaryMineProblemsHeader>
      <MemeDictionaryMineProblemsHeadline/>
      <MemeDictionaryMineProblemsListArea>
      <MemeDictionaryMineProblemsList/>
      </MemeDictionaryMineProblemsListArea>
    </MemeDictionaryMineWraaper>
    // </MineBackground>
  )      
}

export default MemeDictionaryMineProblems;