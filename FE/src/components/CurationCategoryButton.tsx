import { useState } from "react";
import styled from "styled-components";

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
const Text = styled.div<{ active: boolean }>`
  position: relative;
  font-size: 1.5vw;
  padding-bottom: 0.5vw;
  &::after {
    content: "";
    display: block;
    width: ${props => (props.active ? "100%" : "0")};
    height: 0.5rem;
    background-color: var(--aqua);
    position: absolute;
    bottom: 0;
    left: 100%;
    transform: ${props => (props.active ? "translateX(-100%)" : "translateX(0)")};
    transition: all 0.5s ease-in-out;
  }
`;

const category = ["뉴스", "공연", "맛집", "관광"];
const icon: [number, string][] = [
  [
    4,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Newspaper.png",
  ],
  [
    4,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Musical%20Note.png",
  ],
  [
    5,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cut%20of%20Meat.png",
  ],
  [
    5,
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Camping.png",
  ],
];

interface CurationCategoryButtonProps {
  setCategory: (category: string) => void;
}

function CurationCategoryButton({ setCategory }: CurationCategoryButtonProps) {
  const [activeCategory, setActiveCategory] = useState<string>(category[0]);

  return (
    <CurationCategoryButtonWrapper>
      {category.map((cate, index) => {
        return (
          <ButtonWrapper
            onClick={() => {
              setCategory(cate);
              setActiveCategory(cate);
            }}
          >
            <Image src={icon[index][1]} size={icon[index][0]} />
            <Text active={cate === activeCategory}>{cate}</Text>
          </ButtonWrapper>
        );
      })}
    </CurationCategoryButtonWrapper>
  );
}

export default CurationCategoryButton;
