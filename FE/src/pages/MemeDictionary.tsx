import HeadBar from "../components/HeadBar"
import styled from "styled-components";
import MemeNavigationBarforDesktop from "../components/MemeNavigationBarforDesktop";
import MemeDictionaryProcessBox from "../components/MemeDictionaryProcessBox";

import { useState } from "react";
const MemeDictionaryWrapper = styled.div`
  width: 100vw;
  height: 10000px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 4vh 4vw;
  gap: 6vw;
  background: var(--gray04);
  font-size: var(--font-size-base);
  font-family: "NanumSquareNeoExtraBold";
  overflow-x: hidden;
  color: var(--dark02);
`;
function MemeDictionary() {
  return (
    <MemeDictionaryWrapper>
      <HeadBar/>
      <MemeNavigationBarforDesktop/>
      <MemeDictionaryProcessBox/>
    </MemeDictionaryWrapper>
  )
}

export default MemeDictionary