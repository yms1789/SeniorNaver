import styled from "styled-components";
import { useRecoilState,useSetRecoilState } from "recoil";
import MemeDictionaryMineSavedWordsList from "./MemeDictionaryMineSavedWordsList";
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

const SavedWordsHeader = styled.div`
  margin-top: 150px;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 60px;
  text-align: center;
  margin-bottom: 10px;
  user-select: none;
`
const SavedWordsHeadline = styled.div`
  width: 850px;
  border: 1px solid var(--dark01);
` 
const SavedWordsListArea = styled.div`
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

function MemeDictionaryMineSavedWords() {
  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  return (
    <MemeDictionaryMineWraaper>
      <SavedWordsHeader>저장한 단어</SavedWordsHeader>
      <SavedWordsHeadline/>
      <SavedWordsListArea>
      <MemeDictionaryMineSavedWordsList/>
      </SavedWordsListArea>
    </MemeDictionaryMineWraaper>
  )      
}

export default MemeDictionaryMineSavedWords;