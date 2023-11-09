import styled from "styled-components";
import { curationCategory, curationIcon } from "../utils/utils";
import { useRecoilState } from "recoil";
import { curationCategoryState } from "../states/curationCategory";

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
`;
const Image = styled.img<{ size: number }>`
  height: ${props => props.size}vw;
  width: ${props => props.size}vw;
  margin-top: ${props => (props.size === 5 ? "-0.6vw" : "0")};
`;
const Text = styled.div<{ $active: boolean }>`
  position: relative;
  font-size: 1.5vw;
  padding-bottom: 0.5vw;
  &::after {
    content: "";
    display: block;
    width: ${props => (props.$active ? "100%" : "0")};
    height: 0.5rem;
    background-color: var(--aqua);
    position: absolute;
    bottom: 0;
    left: 100%;
    transform: ${props => (props.$active ? "translateX(-100%)" : "translateX(0)")};
    transition: all 0.5s ease-in-out;
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
            <Image src={curationIcon[index][1]} size={curationIcon[index][0]} />
            <Text $active={cate === activeCategory}>{cate}</Text>
          </ButtonWrapper>
        );
      })}
    </CurationCategoryButtonWrapper>
  );
}

export default CurationCategoryButton;
