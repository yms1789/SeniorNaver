import { useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const NavigationButtonWrapper = styled.div`
  position: fixed;
  top: 50%;
  right: 0px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const NavigationButton = styled.button`
  background-color: white;
  color: #6c6c6c;
  border: solid 1px lightgray;
  padding: 20px 10px;
  border-radius: 0;
  font-family: "NanumSquareNeoExtraBold";
  &:last-child {
    border-radius: 100%;
    height: 70px;
    background-color: black;
    margin-top: 10px;
  }
  &:hover {
    border: 1px solid orange;
  }
`;

const BUTTON_TEXT = ["홈", "장소", "MZ사전", "내정보", "챗봇"];

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
        navigate("/");
        break;
      case "장소":
        navigate("/places");
        break;
      case "일자리":
        navigate("/jobs");
        break;
      default:
        break;
    }
  }, []);
  return (
    <NavigationButtonWrapper>
      {BUTTON_TEXT.map(text => {
        return (
          <NavigationButton key={text} onClick={() => handleNavigate(text)}>
            {text}
          </NavigationButton>
        );
      })}
    </NavigationButtonWrapper>
  );
}
export default NavigationBar;
