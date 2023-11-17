import styled from "styled-components";

const RoundedButtonWrapper = styled.div`
  cursor: pointer;
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
  background: ${props => (props.$isActive ? "var(--maingradient)" : "var(--white)")};
  transition: all 0.2s ease-in-out;
  font-family: "NanumSquareNeoBold";
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1280px) {
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    padding: 0.3vw 1vw;
    font-size: 3vw;
  }
  @media (max-width: 450px) {
    font-size: 5vw;
    padding: 0.3vw 2vw;
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
