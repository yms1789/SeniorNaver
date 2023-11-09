import styled from "styled-components";
const MemeDictionaryBookWraaper = styled.div`
  width: 930px;
  height: 100%;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
`
const MemeDictionaryBookWordBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    box-shadow: 4px 8px 30px rgba(0, 0, 0, 0.1);
    background: linear-gradient(360deg, #bebebe -62.37%, rgba(94, 94, 94, 0) 105.3%);    
    margin-top: 20px;
    padding: 25px;
    color: var(--emerald);
  }
  &:active {
    background: linear-gradient(360deg, #626262 -62.37%, rgba(94, 94, 94, 0) 105.3%);    
    box-shadow: 4px 4px 20px rgba(168, 168, 168, 0.55);
  }
  `
const MemeDictionaryBookWordBox = styled.div`
  width: 900px;
  height: 160px;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;  
`
const MemeDictionaryBookWordBoxLine = styled.div`
  margin-top: 20px;
  width: 900px;
  border: 1px solid var(--dark30);
`
const MemeDictionaryBookWordBoxLine2 = styled.div`
  margin-top: 8px;
  width: 900px;
  border: 1px solid var(--dark10);
`
const MemeDictionaryBookHeader = styled.div`
  font-family: "NanumSquareNeoBold";
  font-size: 40px;
  margin-bottom: 20px;
  text-align: start;
  user-select: none;
`
const MemeDictionaryBookContent = styled.div`
  font-family: "NanumSquareNeoRegular";
  font-size: 32px;
  color: var(--gray05);
  text-align: start;
  user-select: none;
`
const MemeDictionaryBookPage = styled.div`
  display: flex;
  height: 600px;
  font-family: "NanumSquareNeoRegular";
  font-size: 24px;
  text-align: center;
  user-select: none;
`
const data = [{
  no : "당모치",
  year : 2000,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "갑분싸",
  year : 2000,
  content : "'갑자기 분위기 싸해진다.'의 준말. 특정 상황에서 갑자기 분위기가 싸늘해지는 상황을 표현하는 신조어.",
},
{
  no : "당모치",
  year : 2000,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "당모치",
  year : 2000,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "당모치",
  year : 2000,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "당모치",
  year : 2000,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
]

function MemeDictionaryBookList({currentPosts}:{currentPosts:any;}) {
  return (
    <MemeDictionaryBookWraaper>
             {currentPosts.map((e:any, index:any) => (
              <MemeDictionaryBookWordBoxWrapper>
              <MemeDictionaryBookWordBox key={index}> 
                <MemeDictionaryBookHeader>{e.no}</MemeDictionaryBookHeader>
                <MemeDictionaryBookContent>{e.content}</MemeDictionaryBookContent>
              </MemeDictionaryBookWordBox>
              <MemeDictionaryBookWordBoxLine/>
              <MemeDictionaryBookWordBoxLine2/>
              </MemeDictionaryBookWordBoxWrapper>
            ))}             
        <MemeDictionaryBookWordBoxWrapper/>
        {/* <MemeDictionaryBookPage/> */}
      </MemeDictionaryBookWraaper>
  )
}
export default MemeDictionaryBookList;