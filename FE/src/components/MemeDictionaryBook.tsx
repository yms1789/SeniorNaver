import MemeDictionaryWords from "./MemeDictionaryWords";
import searchicon from "./../assets/images/searchicon.png"
import styled from "styled-components";
const MemeDictionaryBookWraaper = styled.div`
  width: 930px;
  height: 100vh;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MemeDictionaryBookHeadText = styled.div`
  font-family: "NanumSquareNeoExtraBold";
  font-size: 50px;
  margin-bottom: 20px;
  text-align: center;
  user-select: none;


`
const MemeDictionaryBookSearchBarWrapper = styled.form`
  display: flex;
`

const MemeDictionaryBookSearchBar = styled.input`
  width: 900px;
  height: 90px;
  border-radius: 30px;
  border: 1px solid var(--dark01);
  padding: 25px;
  font-family: "NanumSquareNeoRegular";
  background: var(--white);
  font-size: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 40px;
`
const MemeDictionaryBookSearchIcon = styled.img`
  width: 90px;
  height: 90px;
  cursor: pointer;
`

const MemeDictionaryBookFilterWrapper = styled.form`
  display: flex;
  margin-bottom: 40px;

`

const MemeDictionaryBookFilter = styled.div`
  width: 98px;
  height: 46px;
  font-size: 20px;
  border-radius: 30px;
  border: 1px solid var(--dark01);
  text-align: center;
  font-family: "NanumSquareNeoBold";
  display: flex;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`

function MemeDictionaryBook() {
  return (
    <MemeDictionaryBookWraaper>
      <MemeDictionaryBookHeadText>MZ 용어사전</MemeDictionaryBookHeadText>
      <MemeDictionaryBookSearchBarWrapper>
      <MemeDictionaryBookSearchBar placeholder="검색어를 입력하세요"/>
      <MemeDictionaryBookSearchIcon src={searchicon}/>
      </MemeDictionaryBookSearchBarWrapper>
      <MemeDictionaryBookFilterWrapper>
      <MemeDictionaryBookFilter>2000</MemeDictionaryBookFilter>
      <MemeDictionaryBookFilter>2010</MemeDictionaryBookFilter>
      <MemeDictionaryBookFilter>2020</MemeDictionaryBookFilter>
      </MemeDictionaryBookFilterWrapper>
      <MemeDictionaryWords></MemeDictionaryWords>
      </MemeDictionaryBookWraaper>
  )
}
export default MemeDictionaryBook;