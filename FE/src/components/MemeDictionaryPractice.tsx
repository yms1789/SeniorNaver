import { useRecoilState } from "recoil";
import { memeMineCurrentPracticeState } from "../states/useMeme";
import styled from "styled-components";
import MemeDictionaryPracticeSelector from "./MemeDictionaryPracticeSelector";
import MemeDictionaryPracticePose from "./MemeDictionaryPracticePose";
import MemeDictionaryPracticeRandomSolving from "./MemeDictionaryPracticeRandomSolving";

const MemeDictionaryPracticeWraaper = styled.div`
  width: 930px;
  height: 100%;
  margin-top: 100px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
function MemeDictionaryPractice() {
  const currentPage = useRecoilState(memeMineCurrentPracticeState);
  switch (currentPage[0].currentPage) {
    case 0:
  return (
    <MemeDictionaryPracticeWraaper> 
      <MemeDictionaryPracticeSelector/>
    </MemeDictionaryPracticeWraaper>
  )
  case 1:
    return (
      <MemeDictionaryPracticeWraaper> 
        <MemeDictionaryPracticePose/>
      </MemeDictionaryPracticeWraaper>
    )
  case 2:
    return (
      <MemeDictionaryPracticeWraaper> 
        <MemeDictionaryPracticeRandomSolving/>
      </MemeDictionaryPracticeWraaper>
    )
  case 3:
    return (
      <MemeDictionaryPracticeWraaper> 
        <MemeDictionaryPracticeSelector/>
      </MemeDictionaryPracticeWraaper>
    )
  case 4:
    return (
      <MemeDictionaryPracticeWraaper> 
        <MemeDictionaryPracticeSelector/>
      </MemeDictionaryPracticeWraaper>
    )
  default:
  break;
}
}
export default MemeDictionaryPractice;