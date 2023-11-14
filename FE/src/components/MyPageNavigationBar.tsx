import styled from "styled-components"
import { useSetRecoilState } from "recoil"
import { myPageCategoryState } from "../states/useMyPage"
const MyPageNavigationBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vw;
`
const MyPageNavigationBarRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const MyPageNavigationBarVerticalLine = styled.div`
  display: flex;
  width: 0vw;
  height: 100vh;
  border: 0.1vw solid var(--dark30);
`
const MyPageNavigationBarCategoryWrapper = styled.div` 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
`
const MyPageNavigationBarCategory = styled.div`
  display: flex;
  font-size: 1.8vw;
  font-family: "NanumSquare Neo ExtraBold";
  text-align: center;
  align-items: center;
  justify-content: center;
  color: var(--dark02);
  margin-bottom: 10vh;
  cursor: pointer;
  width: 20vw;
  height: 10vh;
  user-select: none;
  transition: all 0.15s ease;
  &:hover {
    background: var(--dark10);
    color: var(--dark10);
  }
  &:active {
    color: var(--white);
    background: var(--dark30);
  }
` 

function MyPageNavigationBar() {
  const setcurrentCategory = useSetRecoilState(myPageCategoryState)

  return (
    <MyPageNavigationBarWrapper>
      <MyPageNavigationBarRowWrapper>
      <MyPageNavigationBarCategoryWrapper>
      <MyPageNavigationBarCategory onClick={()=> setcurrentCategory({ currentCategory: 0 })}>
        프로필
      </MyPageNavigationBarCategory>
      <MyPageNavigationBarCategory onClick={()=> setcurrentCategory({ currentCategory: 1 })}>
        스크랩
      </MyPageNavigationBarCategory>
      <MyPageNavigationBarCategory onClick={()=> setcurrentCategory({ currentCategory: 2 })}>
        문의하기
      </MyPageNavigationBarCategory>
      <MyPageNavigationBarCategory onClick={()=> setcurrentCategory({ currentCategory: 3 })}>
        회원탈퇴
      </MyPageNavigationBarCategory>
      </MyPageNavigationBarCategoryWrapper>
      <MyPageNavigationBarVerticalLine/>
      </MyPageNavigationBarRowWrapper>
    </MyPageNavigationBarWrapper>
  )
}
export default MyPageNavigationBar