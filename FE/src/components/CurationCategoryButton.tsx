import styled from "styled-components";

const Div10 = styled.div`
  position: relative;
  font-weight: 800;
`;
const Button9 = styled.div`
  border-bottom: 3px solid var(--dark02);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-xs) 0rem;
`;
const ButtonGroup = styled.div`
  position: absolute;
  width: calc(100% - 910px);
  top: 52.06rem;
  right: 28.44rem;
  left: 28.44rem;
  height: 3.19rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  font-size: var(--font-size-5xl);
`;

function CurationCategoryButton() {
  return (
    <ButtonGroup>
      <Button9>
        <Div10>뉴스</Div10>
      </Button9>
      <Button9>
        <Div10>공연</Div10>
      </Button9>
      <Button9>
        <Div10>맛집</Div10>
      </Button9>
      <Button9>
        <Div10>관광</Div10>
      </Button9>
    </ButtonGroup>
  );
}

export default CurationCategoryButton;
