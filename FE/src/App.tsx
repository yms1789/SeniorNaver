// import React, { useState, useEffect } from "react";
import React, { Suspense } from "react";
import { useNavermaps } from "react-naver-maps";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChatButton from "./components/ChatButton";
import CompletedSignUp from "./components/CompletedSignUp";
import CurationShowDetail from "./components/CurationShowDetail";
import CurationTravelDetail from "./components/CurationTravelDetail";
import Chats from "./pages/Chats";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Join from "./pages/Join";
import Login from "./pages/Login";
import MemeDictionary from "./pages/MemeDictionary";
import Mypage from "./pages/Mypage";
import Places from "./pages/Places";
import SignUp from "./pages/SignUp";
import Wait from "./pages/Wait";
import records from "./states/records";

const Recording = React.lazy(() => import("./pages/Recording"));

const AppWrapper = styled.div<{ $isRecord: boolean }>`
  display: ${props => (props.$isRecord ? "none" : "block")};
`;

function App() {
  const navermaps = useNavermaps();
  const isRecord = useRecoilValue(records);
  return (
    <>
      <AppWrapper $isRecord={isRecord}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/show/:showId" element={<CurationShowDetail />} />
          <Route
            path="/travel/:travelId"
            element={<CurationTravelDetail navermaps={navermaps} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/join" element={<Join />} />
          <Route path="/places" element={<Places navermaps={navermaps} />} />
          <Route path="/oauth/login/oauth2/code/naver" element={<Wait />} />
          <Route path="/completed" element={<CompletedSignUp />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route
            path="/jobs"
            element={
              <Suspense>
                <Jobs />
              </Suspense>
            }
          />
          <Route path="/chats" element={<Chats />} />
          <Route path="/job-detail" element={<JobDetail navermaps={navermaps} />} />
          <Route path="/Meme" element={<MemeDictionary />} />
        </Routes>
      </AppWrapper>
      {isRecord && <Recording />}
      <ChatButton />
    </>
  );
}

export default App;
