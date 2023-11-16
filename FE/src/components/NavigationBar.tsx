import { useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { css, styled } from "styled-components";

const NavigationButtonWrapper = styled.div`
  @media screen and (max-width: 450px) {
    bottom: 0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    z-index: 100;
    top: auto;
  }
  position: fixed;
  right: 0;
  bottom: 150px;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;
const NavigationButton = styled.button<{ $active: boolean }>`
  @media screen and (max-width: 450px) {
    width: 100%;
    padding: 20px 10px;
    box-shadow: 10px 0px 20px rgba(0, 0, 0, 0.1);
    height: 70px;
    border: 2px solid transparent;
    z-index: 100;
    &:hover {
      border: 2px solid var(--emerald);
    }
    ${props =>
      props.$active &&
      css`
        border: 2px solid var(--emerald);
      `}
  }
  background-color: white;
  color: #6c6c6c;
  border: solid 2px lightgray;
  padding: 20px 10px;
  margin-bottom: -1px;
  border-radius: 0;
  font-family: "NanumSquareNeoExtraBold";

  &:hover {
    border: 2px solid var(--emerald);
  }
  ${props =>
    props.$active &&
    css`
      border: 2px solid var(--emerald);
    `}
`;

const BUTTON_TEXT = ["홈", "장소", "MZ사전", "내정보"];
const ACTIVE_BUTTON: {
  [key: string]: string;
} = {
  home: "홈",
  places: "장소",
  Meme: "MZ사전",
  mypage: "내정보",
  jobs: "일자리",
};

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  if (
    location.pathname.includes("places") ||
    location.pathname.includes("job-detail") ||
    location.pathname.includes("jobs")
  ) {
    BUTTON_TEXT.splice(3, 1, "일자리");
  } else {
    BUTTON_TEXT.splice(3, 1, "내 정보");
  }
  const handleNavigate = useCallback((text: string) => {
    switch (text) {
      case "홈":
        navigate("/home");
        break;
      case "장소":
        navigate("/places");
        break;
      case "일자리":
        navigate("/jobs");
        break;
      case "MZ사전":
        navigate("/meme");
        break;
      default:
        break;
    }
  }, []);
  return (
    <NavigationButtonWrapper>
      {BUTTON_TEXT.map(text => {
        return (
          <NavigationButton
            key={text}
            onClick={() => handleNavigate(text)}
            $active={ACTIVE_BUTTON[location.pathname.slice(1)] === text}
          >
            {text}
          </NavigationButton>
        );
      })}
    </NavigationButtonWrapper>
  );
}
export default NavigationBar;
