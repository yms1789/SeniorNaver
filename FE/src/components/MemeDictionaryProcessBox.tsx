import styled from "styled-components"
import MemeDictionaryTodayMeme from "./MemeDictionaryTodayMeme"
import MemeDictionaryBook from "./MemeDictionaryBook";
import MemeDictionaryPractice from "./MemeDictionaryPractice";
import MemeDictionaryMine from "./MemeDictionaryMine";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { memeCurrentTapState } from "../states/useMeme";


const MemeDictionaryProcessBoxWrapper = styled.div`
  position: absolute;
  width: 1110px;
  height: 950px;
  background: var(--white);
  border: 1px solid var(--dark01);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: calc(50% - 1110px/2 + 117px);
  top: 110px;
`

function MemeDictionaryProcessBox() {
  const currentTab = useRecoilState(memeCurrentTapState);
  switch (currentTab[0].currentPage) {
    case 0:
  return (
    <MemeDictionaryProcessBoxWrapper> 
      <MemeDictionaryTodayMeme/>
    </MemeDictionaryProcessBoxWrapper>
  )
  case 1:
    return (
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryPractice/>
      </MemeDictionaryProcessBoxWrapper>
    )
  case 2:
    return (
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryBook/>
      </MemeDictionaryProcessBoxWrapper>
    )
  case 3:
    return (
      <MemeDictionaryProcessBoxWrapper> 
        <MemeDictionaryMine/>
      </MemeDictionaryProcessBoxWrapper>
    )
  default:
  break;
}
}

export default MemeDictionaryProcessBox