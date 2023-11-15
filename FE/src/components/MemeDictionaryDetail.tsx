import styled from "styled-components";
import { useRecoilState } from "recoil";
import { memeMineCurrentWordDetailState } from "../states/useMeme";
import {BsFillBookmarksFill} from "react-icons/bs"
const MemeDictionaryDetailWraaper = styled.div`
  padding: 50px;
  width: 930px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const MemeDictionaryDetailWordName = styled.div`
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 64px;
  color: var(--white);
  -webkit-text-stroke: 2px var(--dark01);
`
const MemeDictionaryDetailHeader = styled.div`
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

const MemeDictionaryDetailInfoIcon = styled.div`
  display: flex;
  position: relative;
  top: 30px;
  left: 330px;
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    top: 36px;
  }
  &:active {
    top: 30px;
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
const Data = [{index : 192, wordname: "쫌쫌따리", description: "조금씩 매우 적고 하찮은 양을 모으는 모습을 나타내는 신조어. 닭발의 뼈에 붙어있던 아주 적은 양의 살에서 유래하였다.", example : "“쫌쫌따리 모으다보면 나도 언젠간..”"}]

function MemeDictionaryDetail() {
  const currentWord = useRecoilState(memeMineCurrentWordDetailState);
  return(
    <MemeDictionaryDetailWraaper>
      <MemeDictionaryDetailHeader>No.{Data[0].index}</MemeDictionaryDetailHeader>
      <MemeDictionaryDetailInfoBox>      
        <MemeDictionaryDetailWordName>
          {Data[0].wordname}
      </MemeDictionaryDetailWordName>
      <MemeDictionaryDetailInfoIcon>
      <BsFillBookmarksFill size="50" color="var(--white)" />
      </MemeDictionaryDetailInfoIcon>
      </MemeDictionaryDetailInfoBox>
      <MemeDictionaryDetailHeader>뜻 풀이</MemeDictionaryDetailHeader>
      <MemeDictionaryDetailContent>{Data[0].description}</MemeDictionaryDetailContent>
      <MemeDictionaryDetailHeader>예문</MemeDictionaryDetailHeader>
      <MemeDictionaryDetailContent>{Data[0].example}</MemeDictionaryDetailContent>
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