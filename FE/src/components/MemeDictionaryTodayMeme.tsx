import styled from "styled-components";
import {BsFillBookmarksFill} from "react-icons/bs"
import { fetchTodayWord, fetchDetail, scrapWord, deleteScrapWord } from "../hooks/useMemeQuery";

import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../states/useUser";

interface IconProps {
  isScrapped: boolean | undefined; 
}

const MemeDictionaryTodayMemeWraaper = styled.div`
  margin-top: 100px;
  width: 930px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MemeDictionaryTodayMemeHeadText = styled.div`
  margin-right: 600px;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  margin-bottom: 20px;
`
const MemeDictionaryTodayMemeInfoBox = styled.div`
  width: 850px;
  height: 350px;
  background: #33E47A;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`
const MemeDictionaryDetailInfoIcon = styled.div<IconProps>`
  display: flex;
  position: relative;
  top: 60px;
  left: 330px;
  color: ${props => props.isScrapped ? 'var(--white)' : 'var(--dark10)'}; 
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    top: 50px;
  }
  &:active {
    top: 60px;
  }
`
const MemeDictionaryTodayMemeInfoBoxHeader = styled.div`
  position: relative;
  top: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 64px;
  color: var(--white);
  -webkit-text-stroke: 2px var(--dark01);
`
const MemeDictionaryTodayMemeDefinitionHeader = styled.div`
  user-select: none;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  text-align: left;
  font-size: 46px;
  height: auto;
`
const MemeDictionaryTodayMemeDefinitionContent = styled.div`
  display: flex;
  font-family: "NanumSquareNeoBold";
  text-align: left;
  font-size: 32px;
  margin-bottom: 50px;
`
const MemeDictionaryHeadline = styled.div`
  width: 900px;
  border: 1px solid var(--dark30);
  margin-bottom: 150px;
` 

const YearBox = styled.div`
  position: relative;
  user-select: none;
  top: -200px;
  right: -300px;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 26px;
  letter-spacing: -0.05em;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  color: var(--white);
  background: var(--dark01);
  border-radius: 30px;
`

function MemeDictionaryTodayMeme() {
  const [wordData, setWordData] = useState<{word: string, mean: string, scrap: boolean, useYear: string, example: string} | null>(null);
  const [wordId, setWordId] = useState<number | undefined>();
  const [isLoggedIn] = useRecoilState(isLoggedInState);  

  const handleScrap = async () => {
    if (wordId === undefined) return;
    if (wordData?.scrap) {
      await deleteScrapWord(wordId);
      fetchToday();

    } else {
      await scrapWord(wordId);
      fetchToday();

    }
  }
  const fetchToday = async () => {
    const data = await fetchTodayWord();
    const wordId = Number(Object.values(data)[0]);     
    console.log(wordId) 
    setWordId(wordId);
  };

  useEffect(() => {
    fetchToday();
  }, []);
  
  useEffect(() => {
    if (wordId) {
      console.log(typeof(wordId))
      const fetchDetailWord = async () => {
        const data = await fetchDetail(wordId);
        setWordData(data);
      };
      fetchDetailWord();
    }
  }, [wordId]); 
  

  return (
    <MemeDictionaryTodayMemeWraaper>
      <MemeDictionaryTodayMemeHeadText>오늘의 용어</MemeDictionaryTodayMemeHeadText>
      <MemeDictionaryHeadline/>
      <MemeDictionaryTodayMemeInfoBox>
      <MemeDictionaryTodayMemeInfoBoxHeader>"{wordData?.word}"</MemeDictionaryTodayMemeInfoBoxHeader>
        {isLoggedIn && 
          <MemeDictionaryDetailInfoIcon isScrapped={wordData?.scrap} onClick={handleScrap}>
            <BsFillBookmarksFill size="50" />
          </MemeDictionaryDetailInfoIcon>
        }
        <YearBox>{wordData?.useYear}</YearBox>
      </MemeDictionaryTodayMemeInfoBox>
      <MemeDictionaryTodayMemeDefinitionHeader>뜻풀이</MemeDictionaryTodayMemeDefinitionHeader>
      <MemeDictionaryTodayMemeDefinitionContent>{wordData?.mean}</MemeDictionaryTodayMemeDefinitionContent>
      <MemeDictionaryTodayMemeDefinitionHeader>예문</MemeDictionaryTodayMemeDefinitionHeader>
      <MemeDictionaryTodayMemeDefinitionContent>{wordData?.example}</MemeDictionaryTodayMemeDefinitionContent>
      </MemeDictionaryTodayMemeWraaper>
  )
}
export default MemeDictionaryTodayMeme;