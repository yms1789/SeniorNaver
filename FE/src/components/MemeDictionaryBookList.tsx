import styled from "styled-components";
import { memeMineCurrentWordDetailState, memeCurrentTapState } from "../states/useMeme";
import { useSetRecoilState } from "recoil";

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
  transition: all 0.25s ease-in-out;
  &:hover {
    box-shadow: 4px 8px 30px rgba(0, 0, 0, 0.1);
    background: linear-gradient(360deg, #bebebe -62.37%, rgba(94, 94, 94, 0) 105.3%);    
    padding: 10px;
    color: var(--emerald);
  }
  &:active {
    background: linear-gradient(360deg, #626262 -62.37%, rgba(94, 94, 94, 0) 105.3%);    
    box-shadow: 4px 4px 20px rgba(168, 168, 168, 0.55);
  }
  `
const MemeDictionaryBookWordBox = styled.div`
  width: 900px;
  height: auto;
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
const MemeDictionaryBookRowWrapper = styled.div`
  display : flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`
const MemeDictionaryBookHeader = styled.div`
  font-family: "NanumSquareNeoBold";
  display: flex;
  font-size: 40px;
  text-align: start;
  user-select: none;
`


const MemeDictionaryBookContent = styled.div`
  font-family: "NanumSquareNeoRegular";
  font-size: 32px;
  height: auto;
  color: var(--gray05);
  text-align: start;
  user-select: none;
`
const YearBox = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 26px;
  letter-spacing: -0.05em;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  background: var(--maingradient);
  border-radius: 30px;
  margin-left: 15px;
`

function MemeDictionaryBookList({currentPosts}:{currentPosts:any;}) {
  const setCurrentTab = useSetRecoilState(memeCurrentTapState);
  const setcurrentWord = useSetRecoilState(memeMineCurrentWordDetailState);

  const handleSetState = (index : number) =>{
    setCurrentTab({currentPage : 4});
    setcurrentWord({currentWord : index});
  }

  return (
    <MemeDictionaryBookWraaper>
             {currentPosts.map((e:any, index:any) => (
              <MemeDictionaryBookWordBoxWrapper onClick={()=>handleSetState(e.wordId)}>
              <MemeDictionaryBookWordBox key={index}> 
              <MemeDictionaryBookRowWrapper>
                <MemeDictionaryBookHeader>{e.word}</MemeDictionaryBookHeader>
                <YearBox>{e.year}</YearBox>
                </MemeDictionaryBookRowWrapper>
                <MemeDictionaryBookContent>{e.mean}</MemeDictionaryBookContent>
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