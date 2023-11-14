// import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { useNavermaps } from "react-naver-maps";
import { Route, Routes } from "react-router-dom";
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
import MyPage from "./pages/MyPage";
import Places from "./pages/Places";
import SignUp from "./pages/SignUp";
import Wait from "./pages/Wait";

function App() {
  const navermaps = useNavermaps();

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/show/:showId" element={<CurationShowDetail />} />
      <Route path="/travel/:travelId" element={<CurationTravelDetail navermaps={navermaps} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/join" element={<Join />} />
      <Route path="/places" element={<Places navermaps={navermaps} />} />
      <Route path="/oauth/login/oauth2/code/naver" element={<Wait />} />
      <Route path="/completed" element={<CompletedSignUp />} />
      <Route path="/mypage" element={<MyPage />} />
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
      <Route path="/meme" element={<MemeDictionary />} />
    </Routes>
  );
}

export default App;
