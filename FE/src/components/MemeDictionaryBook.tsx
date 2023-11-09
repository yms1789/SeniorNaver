import MemeDictionaryBookList from "./MemeDictionaryBookList";
import searchicon from "./../assets/images/searchicon.png"
import styled from "styled-components";
import Pagination  from "./Pagination";
import { useState } from "react";
const MemeDictionaryBookWraaper = styled.div`
  width: 930px;
  margin-top: 100px;
  height: 100%;
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
const MemeDictionaryBookEmpty = styled.div`
  height: 450px;
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

const PaginationWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const data = [{
  no : "당모치",
  page : 0,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "갑분싸",
  page : 0,
  content : "'갑자기 분위기 싸해진다.'의 준말. 특정 상황에서 갑자기 분위기가 싸늘해지는 상황을 표현하는 신조어.",
},
{
  no : "당모치",
  page : 0,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "당모치",
  page : 0,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "당모치",
  page : 0,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
{
  no : "당모치",
  page : 0,
  content : "'치킨의 위상을 높게 표현한 신조어. '당연히 모든 치킨은 옳다'의 준말이다. '치느님'과 유사한 표현이다.",
},
]

function MemeDictionaryBook() {
  const [posts, setPosts] = useState(data);
  const [currentPage, setCurrentPage] = useState(data[0].page+1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  // console.log(firstPostIndex)
  // console.log(lastPostIndex)
  // console.log(currentPosts)

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
      <MemeDictionaryBookList currentPosts={currentPosts}/>
      <PaginationWrapper>
      <Pagination
          postsNum={posts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </PaginationWrapper>
      </MemeDictionaryBookWraaper>
      
  )
}
export default MemeDictionaryBook;