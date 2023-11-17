import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { memeMineCurrentWordDetailState, memeCurrentTapState } from "../states/useMeme";
import { AiOutlineHeart } from "react-icons/ai";

const MemeDictionaryMineWraaper = styled.div`
  width: 930px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const SavedWordsListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const SavedWordsListInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const SavedWordsListBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 870px;
  height: 135px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 37.5%);
  border: 1px solid rgba(19, 19, 26, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.25);
    background: var(--dark30);
    padding: 20px;
    color: var(--gray01);
  }
  &:active {
    color: var(--white);
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.55);
  }
`

const SavedWordsListBoxWordName = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 40px;
  text-align: center;
  user-select: none;
`
const SavedWordsListBoxNumber = styled.div`
  margin-right: 50px;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 24px;
  text-align: center;
  user-select: none;
`

const SavedWordsListBoxYear = styled.div`
  margin-left: 50px;
  display: flex;
  font-family: "NanumSquareNeoRegular";
  font-size: 24px;
  text-align: center;
  user-select: none;
`
const SavedWordsListBoxHeart = styled.div`
  margin-left: 50px;
`

const data = [{
  year : 2020,
  content : "쫌쫌따리",
  saved : true
},
{
  year : 2020,
  content : "쿠루루 삥 뽕",
  saved : true
},
{
  year : 2000,
  content : "킹받네",
  saved : true
},
{
  year : 2020,
  content : "스불재",
  saved : true
},
{
  year : 2020,
  content : "완내스",
  saved : true
},
{
  year : 2010,
  content : "누칼협",
  saved : true
},
]


function MemeDictionaryMineSavedWordsList({currentPosts}:{currentPosts:any;}) {
  const setCurrentTab = useSetRecoilState(memeCurrentTapState);
  const setcurrentWord = useSetRecoilState(memeMineCurrentWordDetailState);

  const handleSetState = (index : number) =>{
    setCurrentTab({currentPage : 4});
    setcurrentWord({currentWord : index});
  }
  

  return (
    <MemeDictionaryMineWraaper>
              {currentPosts.map((e:any, index:number) => (
              <SavedWordsListWrapper key={index}> 
              <SavedWordsListInnerWrapper>
                <SavedWordsListBox onClick={()=>handleSetState(e.id)}>
                <SavedWordsListBoxNumber>No.{e.id}</SavedWordsListBoxNumber>
                <SavedWordsListBoxWordName>{e.title}</SavedWordsListBoxWordName>
                <SavedWordsListBoxYear>{e.year}</SavedWordsListBoxYear>
                {/* <SavedWordsListBoxHeart>                
                  <AiOutlineHeart size="50" color="var(--red)"/>
                </SavedWordsListBoxHeart> */}
                </SavedWordsListBox>
                </SavedWordsListInnerWrapper>
              </SavedWordsListWrapper>
            ))} 
    </MemeDictionaryMineWraaper>
  )      
}

export default MemeDictionaryMineSavedWordsList;