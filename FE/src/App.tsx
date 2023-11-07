// import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Join from "./pages/Join";
import Wait from "./pages/Wait";
import CompletedSignUp from "./components/CompletedSignUp";
import Mypage from "./pages/Mypage";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import { useNavermaps } from "react-naver-maps";

function App() {
  // let navigate = useNavigate();
  const navermaps = useNavermaps();

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/join" element={<Join />} />
      <Route path="/places" element={<Places navermaps={navermaps} />} />
      <Route path="/oauth/login/oauth2/code/naver" element={<Wait />} />
      <Route path="/completed" element={<CompletedSignUp />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/job-detail" element={<JobDetail navermaps={navermaps} />} />
    </Routes>
  );
}

export default App;
