import styled from "styled-components";
import mineicon from "./../assets/images/mineicon.png"
import { useRecoilState,useSetRecoilState } from "recoil";
import { memeMineCurrentCategoryState } from "../states/useMeme";

const MemeDictionaryMineWraaper = styled.div`
  width: 930px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`
const MemeDictionaryMineSelectBoxWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const MemeDictionaryMineSelectBoxWrapperRight = styled.div`
  display: flex;
  margin-left: -120px;
  margin-bottom: 20px;

`
const MemeDictionaryMineSelectBox = styled.div`
  width: 500px;
  height: 150px;
  background: var(--white);
  border: 7px solid #3FD5DE;
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(242, 168, 168, 0.25);
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 60px;
  font-family: "NanumSquareNeoExtraBold";
  margin-bottom: 60px;
  z-index: 12;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;
  &:hover {
    border: 2px solid transparent;
    padding: 50px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
    color: var(--white);

  }
`
const MemeDictionaryMineSelectBoxImage = styled.img`
  position: relative;
  top: -70px;
  right: 550px;
  width: 135px;
  height: 135px;
  z-index: 13;
  user-select: none;
  /* transform: rotate(-45deg); */
`
const GradiEffect = styled.div`
  position: relative;
  left: -200px;
  width: 550px;
  height: 150px;
  background: linear-gradient(90deg, rgba(73, 255, 190, 0.49) 14.23%, rgba(217, 217, 217, 0) 50%);
  z-index: 11;
`
const GradiEffect2 = styled.div`
  position: relative;
  right: -20px;
  width: 550px;
  height: 150px;
  background: linear-gradient(90deg, rgba(73, 255, 190, 0.49) 14.23%, rgba(217, 217, 217, 0) 50%);
  transform: rotate(-180deg);
  z-index: 11;
`
const MemeDictionaryMineHeader = styled.div`
  display: flex;
  font-family: "NanumSquareNeoHeavy";
  font-size: 50px;
  text-align: center;
  margin-bottom: 20px;
`
const MemeDictionaryHeadline = styled.div`
  width: 900px;
  border: 1px solid var(--dark30);
  margin-bottom: 150px;
` 

function MemeDictionaryMineSelector() {
  const currentCategory = useRecoilState(memeMineCurrentCategoryState);
  const setcurrentCategory = useSetRecoilState(memeMineCurrentCategoryState);

  return (
    <MemeDictionaryMineWraaper>
      <MemeDictionaryMineHeader>내 단어장</MemeDictionaryMineHeader>
      <MemeDictionaryHeadline/>
      <MemeDictionaryMineSelectBoxWrapper>
      <MemeDictionaryMineSelectBox onClick={()=> setcurrentCategory({currentCategory : 1})}>저장한 단어
      </MemeDictionaryMineSelectBox>
      <MemeDictionaryMineSelectBoxImage src={mineicon}/>
      <GradiEffect/>
      </MemeDictionaryMineSelectBoxWrapper>
      
      <MemeDictionaryMineSelectBoxWrapperRight>
      <GradiEffect2/>
      <MemeDictionaryMineSelectBox onClick={()=> setcurrentCategory({currentCategory : 2})}>출제한 문제</MemeDictionaryMineSelectBox>
      <MemeDictionaryMineSelectBoxImage src={mineicon}/>
      </MemeDictionaryMineSelectBoxWrapperRight>

      <MemeDictionaryMineSelectBoxWrapper>
      <MemeDictionaryMineSelectBox onClick={()=> setcurrentCategory({currentCategory : 3})}>단어 성적표</MemeDictionaryMineSelectBox>
      <MemeDictionaryMineSelectBoxImage src={mineicon}/>
      <GradiEffect/>
      </MemeDictionaryMineSelectBoxWrapper>    
      
      </MemeDictionaryMineWraaper>
  )
}
export default MemeDictionaryMineSelector;