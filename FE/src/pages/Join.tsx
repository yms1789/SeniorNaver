import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import JoinProcessBox from "../components/JoinProcessBox";
import { useEffect, useState } from "react";
import SetInfoBox from "../components/SetInfoBox";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../states/useUser";
const JoinInWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #d9d9d9;
  justify-content: center;
  z-index: 10;
`;
const JoinInBox = styled.div`
  margin-top: 150px;
  width: 740px;
  height: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background: linear-gradient(180deg, #46d780 0%, #5cbad8 100%);
  z-index: 10;
`;
const JoinInInnerBox = styled.div`
  width: 735px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 20px;
  z-index: 11;
`;
function Join() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);
  return (
    <JoinInWrapper>
      <HeadBar />
      <JoinInBox>
        <JoinInInnerBox>
          <JoinProcessBox />
        </JoinInInnerBox>
      </JoinInBox>
    </JoinInWrapper>
  );
}
export default Join;
