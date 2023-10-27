import styled from "styled-components";

const Button1 = styled.button`
  cursor: pointer;
  border: 2px solid var(--dark50);
  padding: var(--padding-xs) var(--padding-xl);
  background-color: transparent;
  border-radius: var(--br-980xl);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Button2 = styled.div`
  border-radius: var(--br-980xl);
  border: 2px solid var(--dark50);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-xs) var(--padding-xl);
`;
const ButtonParent = styled.div`
  position: absolute;
  top: 58.63rem;
  left: calc(50% - 342.5px);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-xs);
  font-size: var(--font-size-xl);
  color: var(--dark50);
`;
const B16 = styled.b`
  position: relative;
  font-size: var(--font-size-xl);
  font-family: var(--font-nanumsquare-neo);
  color: var(--dark50);
  text-align: left;
`;

function NewsCategoryButton() {
  return (
    <ButtonParent>
      <Button1 autoFocus={true}>
        <B16>속보</B16>
      </Button1>
      <Button2>
        <B16>정치</B16>
      </Button2>
      <Button2>
        <B16>경제</B16>
      </Button2>
      <Button2>
        <B16>스포츠</B16>
      </Button2>
      <Button2>
        <B16>연예</B16>
      </Button2>
      <Button2>
        <B16>IT</B16>
      </Button2>
      <Button2>
        <B16>지역</B16>
      </Button2>
      <Button2>
        <B16>+</B16>
      </Button2>
    </ButtonParent>
  );
}

export default NewsCategoryButton;
