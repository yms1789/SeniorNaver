import styled from "styled-components";
import { useState } from "react";
import { useRecoilState,useSetRecoilState } from "recoil";
import { memeCurrentTapState } from "../states/useMeme";

const MemeNavBarWrapper = styled.div`
  /* position: fixed; */
  position: absolute;
  width: 293px;
  height: 937px;
  left: -24px;
  top: 110px;
  background: var(--white);
  border: 1px solid var(--dark01);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const setsetCurrentTab = useSetRecoilState(memeCurrentTapState);
  const navMenu = [
    { name: "Tab1", content: "오늘의 용어"  },
    { name: "Tab2", content: "상황별 연습" },
    { name: "Tab3", content: "용어 사전"},
    { name: "Tab4", content: "내 단어장"},
  ];

  const selectMenuHandler = (index:number) => {
    setsetCurrentTab({currentPage : index});
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