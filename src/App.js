import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//AuthService
import Login from "./Dailylog/Component/Auth/Login";
import PasswordReset from "./Dailylog/Component/Auth/PasswordReset";
import SignUp from "./Dailylog/Component/Auth/SignUp";

//Page
import Navbar from "./Dailylog/Component/Navbar";
import Friend from "./Dailylog/Component/Friend";

//Board
import BoardList from "./Dailylog/Component/Board/BoardList";
import BoardPage from "./Dailylog/Component/Board/BoardPage";
import BoardCreate from "./Dailylog/Component/Board/BoardCreate";

import styles from "./Page.module.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/' element={<BoardListLayout />} />
        <Route path='/board/:id' element={<BoardPageLayout />} />

        <Route path='/board/create' element={<BoardCreate />} />
      </Routes>
    </Router>
  );
}
function BoardListLayout() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      {isMobile ? (
        <div className={styles.mobileBoardList}>
          <BoardList />
          <div className={styles.mobileBoardMenu}>
            <Friend />
            <Navbar />
          </div>
        </div>
      ) : (
        <div className={styles.pcBoardList}>
          <Navbar />
          <BoardList />
          <Friend />
        </div>
      )}
    </>
  );
}

function BoardPageLayout() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      {isMobile ? (
        <div className={styles.mobileBoardPage}>
          <Navbar />
          <BoardList />
        </div>
      ) : (
        <div className={styles.pcBoardPage}>
          <Navbar />
          <BoardPage />
        </div>
      )}
    </>
  );
}

export default App;
