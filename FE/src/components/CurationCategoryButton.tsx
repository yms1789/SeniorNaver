import styled from "styled-components";
import { useRecoilState } from "recoil";
import { curationCategoryState } from "../states/curationCategory";
import { curationCategory, curationIcon } from "../utils/utils";

const CurationCategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3.5vw;
`;
const ButtonWrapper = styled.div`
  height: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  justify-content: space-between;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1280px) {
    height: 9.5vw;
  }
  @media (max-width: 768px) {
    height: 12vw;
  }
`;
const Image = styled.img<{ size: number }>`
  height: ${props => props.size}vw;
  width: ${props => props.size}vw;
  margin-top: ${props => (props.size === 5 ? "-0.6vw" : "0")};
  @media (max-width: 1280px) {
    height: ${props => props.size * 1.2}vw;
    width: ${props => props.size * 1.2}vw;
  }
  @media (max-width: 768px) {
    height: ${props => props.size * 1.5}vw;
    width: ${props => props.size * 1.5}vw;
  }
`;
const Text = styled.div<{ $active: boolean }>`
  position: relative;
  font-size: 1.5vw;
  padding-bottom: 0.5vw;
  &::after {
    content: "";
    display: block;
    width: ${props => (props.$active ? "100%" : "0")};
    height: 0.5vw;
    background-color: var(--aqua);
    position: absolute;
    bottom: 0;
    left: 100%;
    transform: ${props => (props.$active ? "translateX(-100%)" : "translateX(0)")};
    transition: all 0.5s ease-in-out;
  }
  @media (max-width: 1280px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

function CurationCategoryButton() {
  const [activeCategory, setActiveCategory] = useRecoilState(curationCategoryState);

  return (
    <CurationCategoryButtonWrapper>
      {curationCategory.map((cate, index) => {
        return (
          <ButtonWrapper
            onClick={() => {
              setActiveCategory(cate);
            }}
            key={index}
          >
            <Image src={curationIcon[index][1]} size={curationIcon[index][0]} alt="Image" />
            <Text $active={cate === activeCategory}>{cate}</Text>
          </ButtonWrapper>
        );
      })}
    </CurationCategoryButtonWrapper>
  );
}

export default CurationCategoryButton;
