import styled from "styled-components";

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
  margin-bottom: 50px;
`
const MemeDictionaryHeadline = styled.div`
  width: 900px;
  border: 1px solid var(--dark30);
  margin-bottom: 150px;
` 
function MemeDictionaryTodayMeme() {
  return (
    <MemeDictionaryTodayMemeWraaper>
      <MemeDictionaryTodayMemeHeadText>오늘의 용어</MemeDictionaryTodayMemeHeadText>
      <MemeDictionaryHeadline/>
      <MemeDictionaryTodayMemeInfoBox>
      <MemeDictionaryTodayMemeInfoBoxHeader>"쫌쫌따리"</MemeDictionaryTodayMemeInfoBoxHeader>
      </MemeDictionaryTodayMemeInfoBox>
      <MemeDictionaryTodayMemeDefinitionHeader>뜻풀이</MemeDictionaryTodayMemeDefinitionHeader>
      <MemeDictionaryTodayMemeDefinitionContent>조금씩 매우 적고 하찮은 양을 모으는 모습을 나타내는 신조어. 닭발의 뼈에 붙어있던 아주 적은 양의 살에서 유래하였다</MemeDictionaryTodayMemeDefinitionContent>
      <MemeDictionaryTodayMemeDefinitionHeader>예문</MemeDictionaryTodayMemeDefinitionHeader>
      <MemeDictionaryTodayMemeDefinitionContent>“쫌쫌따리 모으다보면 나도 언젠간..”</MemeDictionaryTodayMemeDefinitionContent>
      </MemeDictionaryTodayMemeWraaper>
  )
}
export default MemeDictionaryTodayMeme;