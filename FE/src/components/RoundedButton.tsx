import styled from "styled-components";

const Button = styled.div`
  position: absolute;
  top: 131.06rem;
  left: calc(50% - 47.5px);
  border-radius: var(--br-980xl);
  border: 2px solid var(--dark02);
  box-sizing: border-box;
  height: 2.88rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-xs) var(--padding-xl);
  font-size: var(--font-size-xl);
`;
const B16 = styled.b`
  position: relative;
  font-size: var(--font-size-xl);
  font-family: var(--font-nanumsquare-neo);
  color: var(--dark50);
  text-align: left;
`;

function RoundedButton() {
  return (
    <Button>
      <B16>더보기</B16>
    </Button>
  );
}

export default RoundedButton;
