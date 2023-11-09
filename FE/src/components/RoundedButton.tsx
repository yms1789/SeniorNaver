import styled from "styled-components";

const RoundedButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonTextWrapper = styled.div<{ $isActive: boolean }>`
  padding: 0.2vw 0.8vw;
  border: solid 0.15vw ${props => (props.$isActive ? "var(--aqua02)" : "var(--gray03)")};
  border-radius: 99vw;
  font-size: 1.15vw;
  white-space: nowrap;
  color: ${props => (props.$isActive ? "var(--white)" : "var(--dark30)")};
  background-color: ${props => (props.$isActive ? "var(--aqua)" : "var(--white)")};
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

interface TRoundedButtonProps {
  buttonText: string;
  isActive: boolean;
  onClick: () => void;
}

function RoundedButton({ buttonText, isActive, onClick }: TRoundedButtonProps) {
  return (
    <RoundedButtonWrapper onClick={onClick}>
      <ButtonTextWrapper $isActive={isActive}>{buttonText}</ButtonTextWrapper>
    </RoundedButtonWrapper>
  );
}

export default RoundedButton;
