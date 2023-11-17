import styled from "styled-components";
import { useRecoilState,useSetRecoilState } from "recoil";
import MemeDictionaryMineSelector from "./MemeDictionaryMineSelector";
import { memeMineCurrentCategoryState } from "../states/useMeme";

const MemeDictionaryMineWraaper = styled.div`
  width: 930px;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`

function MemeDictionaryMineReport() {
  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  return (
    <MemeDictionaryMineWraaper>
      성적표
    </MemeDictionaryMineWraaper>
  )      
}

export default MemeDictionaryMineReport;