import styled from "styled-components";
import { useRecoilState,useSetRecoilState } from "recoil";
import MemeDictionaryMineSelector from "./MemeDictionaryMineSelector";
import { memeMineCurrentCategoryState } from "../states/useMeme";
import MemeDictionaryMineSavedWords from "./MemeDictionaryMineSavedWords";
import MemeDictionaryMineProblems from "./MemeDictionaryMineProblems";
import MemeDictionaryMineReport from "./MemeDictionaryMineReport";

const MemeDictionaryMineWraaper = styled.div`
  margin-top: 100px;
  width: 930px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`

function MemeDictionaryMine() {
  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  switch (currentCategory[0].currentCategory) {
    case 0:
  return (
    <MemeDictionaryMineWraaper> 
      <MemeDictionaryMineSelector/>
    </MemeDictionaryMineWraaper>
  )
  case 1:
    return (
      <MemeDictionaryMineWraaper> 
        <MemeDictionaryMineSavedWords/>
      </MemeDictionaryMineWraaper>
    )
  case 2:
    return (
      <MemeDictionaryMineWraaper> 
        <MemeDictionaryMineProblems/>
      </MemeDictionaryMineWraaper>
    )
  case 3:
    return (
      <MemeDictionaryMineWraaper> 
        <MemeDictionaryMineReport/>
      </MemeDictionaryMineWraaper>
    )
  default:
  break;
}
}
export default MemeDictionaryMine;