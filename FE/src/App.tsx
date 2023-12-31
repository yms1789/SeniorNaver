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
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Join from "./pages/Join";
import Login from "./pages/Login";
import MemeDictionary from "./pages/MemeDictionary";
import MyPage from "./pages/MyPage";
import Places from "./pages/Places";
import SignUp from "./pages/SignUp";
import Wait from "./pages/Wait";
import records from "./states/records";
import { useAxiosInterceptor } from "./states/useAxiosInterceptor";
import ScrollToTop from "./utils/ScrollToTop";

const Recording = React.lazy(() => import("./pages/Recording"));

const AppWrapper = styled.div<{ $isRecord: boolean }>`
  display: ${props => (props.$isRecord ? "none" : "block")};
`;

function App() {
  const navermaps = useNavermaps();
  const isRecord = useRecoilValue(records);

  useAxiosInterceptor();

  return (
    <>
      <AppWrapper $isRecord={isRecord}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <Home />
                <ChatButton />
              </>
            }
          />
          <Route path="/show/:showId" element={<CurationShowDetail />} />
          <Route
            path="/travel/:travelId"
            element={<CurationTravelDetail navermaps={navermaps} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/places"
            element={
              <>
                <Places navermaps={navermaps} />
                <ChatButton />
              </>
            }
          />
          <Route path="/oauth/login/oauth2/code/naver" element={<Wait />} />
          <Route path="/completed" element={<CompletedSignUp />} />
          <Route
            path="/mypage"
            element={
              <>
                <MyPage />
                <ChatButton />
              </>
            }
          />
          <Route
            path="/jobs"
            element={
              <>
                <Suspense>
                  <Jobs />
                </Suspense>
                <ChatButton />
              </>
            }
          />
          <Route
            path="/job-detail"
            element={
              <>
                <JobDetail navermaps={navermaps} />
                <ChatButton />
              </>
            }
          />
          <Route
            path="/Meme"
            element={
              <>
                <MemeDictionary />
                <ChatButton />
              </>
            }
          />
        </Routes>
      </AppWrapper>
      {isRecord && (
        <Suspense>
          <Recording />
        </Suspense>
      )}
    </>
  );
}

export default App;
