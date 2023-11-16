import styled from "styled-components";
import { useRecoilState } from "recoil";
import { memeMineCurrentCategoryState } from "../states/useMeme";


const MemeDictionaryMineWraaper = styled.div`
  width: 930px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const MemeDictionaryMineProblemsListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const MemeDictionaryMineProblemsListInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const MemeDictionaryMineProblemsListBox = styled.div`
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
    background: var(--gray03);
    padding: 20px;
    color: var(--gray01);
  }
  &:active {
    color: var(--white);
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.55);
  }
`

const MemeDictionaryMineProblemsListBoxWordName = styled.div`
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 40px;
  text-align: center;
  user-select: none;
`
const MemeDictionaryMineProblemsListBoxNumber = styled.div`
  margin-left: 50px;
  display: flex;
  font-family: "NanumSquareNeoExtraBold";
  font-size: 24px;
  text-align: center;
  user-select: none;
  margin-right: 50px;

`

const MemeDictionaryMineProblemsListBoxYear = styled.div`
  margin-left: 150px;
  display: flex;
  font-family: "NanumSquareNeoRegular";
  font-size: 24px;
  text-align: center;
  user-select: none;
`
const data = [{
  no : 19,
  year : 2000,
  content : "우짤래미(1)",
},
{
  no : 122,
  year : 2000,
  content : "우짤래미(2)",
},
{
  no : 192,
  year : 2010,
  content : "하이퍼 우짤래미",
},
{
  no : 2310,
  year : 2020,
  content : "울트라 우짤래미",
},
{
  no : 4784,
  year : 2020,
  content : "어둠의 우짤래미",
},
{
  no : 5121,
  year : 2020,
  content : "마지막 우짤래미",
},
]

function MemeDictionaryMineProblemsList() {
  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  return (
    <MemeDictionaryMineWraaper>
              {data.map((e, index) => (
              <MemeDictionaryMineProblemsListWrapper key={index}> 
              <MemeDictionaryMineProblemsListInnerWrapper>
                <MemeDictionaryMineProblemsListBox>
                <MemeDictionaryMineProblemsListBoxNumber>No.{e.no}</MemeDictionaryMineProblemsListBoxNumber>
                <MemeDictionaryMineProblemsListBoxWordName>{e.content}</MemeDictionaryMineProblemsListBoxWordName>
                <MemeDictionaryMineProblemsListBoxYear>{e.year}</MemeDictionaryMineProblemsListBoxYear>
                </MemeDictionaryMineProblemsListBox>
                </MemeDictionaryMineProblemsListInnerWrapper>
              </MemeDictionaryMineProblemsListWrapper>
            ))} 
    </MemeDictionaryMineWraaper>
  )      
}

export default MemeDictionaryMineProblemsList;