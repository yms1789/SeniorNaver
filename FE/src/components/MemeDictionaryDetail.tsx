import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { memeMineCurrentWordDetailState,  } from "../states/useMeme";
import {BsFillBookmarksFill} from "react-icons/bs"
import { deleteScrapWord, scrapWord } from "../hooks/useMemeQuery";
import { useState, useEffect } from "react";
import { fetchDetail } from "../hooks/useMemeQuery";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../states/useUser";
interface IconProps {
  isScrapped: boolean | undefined; 
}
const MemeDictionaryDetailWraaper = styled.div`
  padding: 50px;
  width: 930px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const MemeDictionaryDetailWordName = styled.div<IconProps>`
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 64px;
  color: var(--white);
  margin-top: ${props => props.isScrapped ? '30px' : '-20px'}; 
  -webkit-text-stroke: 2px var(--dark01);
`
const MemeDictionaryDetailHeader = styled.div`
  user-select: none;
  margin-top: 20px;
  display: flex;  
  font-family: "NanumSquareNeoExtraBold";
  text-align: center;
  font-size: 46px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`
const MemeDictionaryDetailProblemHeader = styled.div`
  user-select: none;
  padding: 40px;
  cursor: pointer;
  margin-top: 70px;
  display: flex;  
  font-family: "NanumSquareNeoExtraBold";
  justify-content: center;
  text-align: center;
  font-size: 46px;
  transition: all 0.25s ease;
  &:hover {
    padding: 20px;
    color: #33E47A;
  }
  &:active {
    color: var(--white);
  }
`

const MemeDictionaryDetailContent = styled.div`
  display: flex;
  font-family: "NanumSquareNeoBold";
  text-align: left;
  font-size: 32px;
  margin-bottom: 50px;
`

const MemeDictionaryDetailInfoBox = styled.div`
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
  top: 10px;
  left: 330px;
  color: ${props => props.isScrapped ? 'var(--white)' : 'var(--dark10)'}; 
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    top: 15px;
  }
  &:active {
    top: 10px;
  }
`

const MemeDictionaryDetailInfoContentWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MemeDictionaryDetailInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "NanumSquareNeoBold";
  text-align: center;
  font-size: 20px;
  margin-bottom: 50px;
  padding: 80px;
`
const MemeDictionaryDetailInfoContentNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "NanumSquareNeoHeavy";
  text-align: center;
  font-size: 32px;
  margin-bottom: 50px;
`
const MemeDictionaryDetailInfoLabel = styled.div`
  width: 100vw;
  height: 200px;
  padding: 100px;
  background: #2d129a;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  color : var(--white);
`

const YearBox = styled.div<IconProps>`
  position: relative;
  user-select: none;
  top: ${props => props.isScrapped ? '0px' : '-10%'}; 
  right: ${props => props.isScrapped ? '-300px' : '-35%'}; 
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

function MemeDictionaryDetail() {
  const [wordData, setWordData] = useState<{word: string, mean: string, scrap: boolean, useYear: string, example: string} | null>(null);
  const currentWord = useRecoilValue(memeMineCurrentWordDetailState);
  const wordId = Number(Object.values(currentWord));     
  const [isLoggedIn] = useRecoilState(isLoggedInState);  


  const handleScrap = async () => {
    if (wordId === undefined) return;
    if (wordData?.scrap) {
      await deleteScrapWord(wordId);
      fetchDetailWord();

    } else {
      await scrapWord(wordId);
      fetchDetailWord();

    }
  }
  const fetchDetailWord = async () => {
    const data = await fetchDetail(wordId);
    setWordData(data);
  };
  useEffect(() => {
    if (wordId) {
      fetchDetailWord();
    }
  }, [currentWord]); 

  return(
    <MemeDictionaryDetailWraaper>
      <MemeDictionaryDetailInfoBox>     
      <YearBox isScrapped={isLoggedIn}>{wordData?.useYear}</YearBox>
        <MemeDictionaryDetailWordName isScrapped={isLoggedIn}>
          {wordData?.word}
      </MemeDictionaryDetailWordName>
      {isLoggedIn && 
          <MemeDictionaryDetailInfoIcon isScrapped={wordData?.scrap} onClick={handleScrap}>
            <BsFillBookmarksFill size="50" />
          </MemeDictionaryDetailInfoIcon>
        }
      </MemeDictionaryDetailInfoBox>
      <MemeDictionaryDetailHeader>뜻 풀이</MemeDictionaryDetailHeader>
      <MemeDictionaryDetailContent>{wordData?.mean}</MemeDictionaryDetailContent>
      <MemeDictionaryDetailHeader>예문</MemeDictionaryDetailHeader>
      <MemeDictionaryDetailContent>{wordData?.example}</MemeDictionaryDetailContent>
      <MemeDictionaryDetailInfoLabel>
      <MemeDictionaryDetailInfoContentWrapper>
      <MemeDictionaryDetailInfoContent>
        공부한 사람 수
        <MemeDictionaryDetailInfoContentNumber>392</MemeDictionaryDetailInfoContentNumber>
      </MemeDictionaryDetailInfoContent>
      <MemeDictionaryDetailInfoContent>
        스크랩
        <MemeDictionaryDetailInfoContentNumber>32</MemeDictionaryDetailInfoContentNumber>
      </MemeDictionaryDetailInfoContent>
      </MemeDictionaryDetailInfoContentWrapper>
      </MemeDictionaryDetailInfoLabel>
      <MemeDictionaryDetailProblemHeader>문제풀이 하러가기 ▶</MemeDictionaryDetailProblemHeader>
    </MemeDictionaryDetailWraaper>
  )
}
export default MemeDictionaryDetail;