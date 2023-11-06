import styled from "styled-components";

const MemeDictionaryTodayMemeWraaper = styled.div`
  width: 930px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MemeDictionaryTodayMemeHeadText = styled.div`
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  margin-bottom: 20px;
`
const MemeDictionaryTodayMemeInfoBox = styled.div`
  width: 820px;
  height: 330px;
  background: #33E47A;
  border-radius: 30px;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`

const MemeDictionaryTodayMemeInfoBoxHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 64px;
  color: var(--white);
  -webkit-text-stroke: 2px var(--dark01);
`
const MemeDictionaryTodayMemeDefinitionHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  text-align: left;
  font-size: 46px;
`
const MemeDictionaryTodayMemeDefinitionContent = styled.div`
  display: flex;
  font-family: "NanumSquareNeoBold";
  text-align: left;
  font-size: 32px;
`
function MemeDictionaryTodayMeme() {
  return (
    <MemeDictionaryTodayMemeWraaper>
      <MemeDictionaryTodayMemeHeadText>오늘의 용어</MemeDictionaryTodayMemeHeadText>
      <MemeDictionaryTodayMemeInfoBox>
      <MemeDictionaryTodayMemeInfoBoxHeader>"쫌쫌따리"</MemeDictionaryTodayMemeInfoBoxHeader>
      </MemeDictionaryTodayMemeInfoBox>
      <MemeDictionaryTodayMemeDefinitionHeader>뜻풀이</MemeDictionaryTodayMemeDefinitionHeader>
      <MemeDictionaryTodayMemeDefinitionContent>MemeDictionaryTodayMemeDefinitionContent</MemeDictionaryTodayMemeDefinitionContent>
      </MemeDictionaryTodayMemeWraaper>
  )
}
export default MemeDictionaryTodayMeme;