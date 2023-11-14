import styled from "styled-components";
import { useRecoilState,useSetRecoilState } from "recoil";
import { isLoggedInState } from "../states/useUser";
import { memeCurrentTapState, memeMineCurrentCategoryState, memeMineCurrentPracticeState,  } from "../states/useMeme";

import Swal from 'sweetalert2'

const MemeNavBarWrapper = styled.div`
  /* position: fixed; */
  position: absolute;
  width: 293px;
  height: 937px;
  left: 200px;
  top: 170px;
  background: var(--white);
  border: 1px solid var(--dark01);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  zoom: 75%;
  @media screen and (max-width: 768px) {
    zoom: 35%;
    top: 800px;
    left: -10 px;
  }
  @media screen and (max-width: 391px) {
    zoom: 20%;
    top: 1500px;
  }
  `

const MemeNavMarLogoBox =styled.div`
  width: 170px;
  height: 50px;
  border-radius: 999px;
  border: 2px solid var(--dark01);
  font-size: 28px;
  font-family: "NanumSquareNeoExtraBold";
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 5px;

`
const MemeNavBarLogoMiniText = styled.div`
  font-size: 14px;
  font-family: "NanumSquareNeoExtraBold";
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
` 

const MemeNavBarTap = styled.div<IbackgroundColor>`
  background: ${props => props.clicked ? 'var(--maingradient)' : 'var(--white)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 110px;
  font-size: 32px;
  margin-bottom: 50px;
  color : ${props => props.clicked ? 'var(--white)' : 'var(--dark01)'};
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;

  &:hover {
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.25);
    padding: 20px;
    color: var(--gray01);
  }
  &:active {
    color: var(--white);
    box-shadow: 4px 4px 20px rgba(45, 238, 168, 0.55);
  }
` 

const MemeNavBarEmpty = styled.div`
  display: flex;
  width: 170px;
  height: 300px;
` 

interface IbackgroundColor{
  clicked?: boolean;
  backgroundColor?: string;
}

function MemeNavigationBarforDesktop() {
  const currentTab = useRecoilState(memeCurrentTapState);
  const setCurrentTab = useSetRecoilState(memeCurrentTapState);
  const setcurrentCategory = useSetRecoilState(memeMineCurrentCategoryState)
  const setcurrentPage = useSetRecoilState(memeMineCurrentPracticeState)
  const [isLoggedIn] = useRecoilState(isLoggedInState);  

  const navMenu = [
    { name: "Tab1", content: "오늘의 용어"  },
    { name: "Tab2", content: "상황별 연습" },
    { name: "Tab3", content: "용어 사전"},
    { name: "Tab4", content: "내 단어장"},
  ];

  const selectMenuHandler = (index:number) => {
    if(index === 1 || index === 3){
      if(isLoggedIn){
        setCurrentTab({currentPage : index});
        setcurrentCategory({currentCategory : 0})
        setcurrentPage({currentPage : 0, currentYear: 0})
      }
      else{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "로그인이 필요합니다.",
          showConfirmButton: false,
          timer: 1500,
          background: "var(--white)",
          color: "var(--dark01)",
          width: "500px",
        });
      }
    }else{
      setCurrentTab({currentPage : index});
      setcurrentCategory({currentCategory : 0})
      setcurrentPage({currentPage : 0, currentYear: 0})
    }
  };

  return (
    <MemeNavBarWrapper>
      <MemeNavMarLogoBox>유행어사전</MemeNavMarLogoBox>
      <MemeNavBarLogoMiniText>FOR SENIOR</MemeNavBarLogoMiniText>
      {navMenu.map((name, index) => (
            <MemeNavBarTap key={index}
            clicked={currentTab[0].currentPage === index}
            onClick={() => selectMenuHandler(index)}>
              {name.content}
            </MemeNavBarTap>
          ))} 
      <MemeNavBarEmpty/>
    </MemeNavBarWrapper>  
  )
}
export default MemeNavigationBarforDesktop;

