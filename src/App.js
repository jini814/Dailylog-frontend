import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

        <Route path='/*' element={<BoardListLayout />} />
        <Route path='/*' element={<BoardPageLayout />} />

        <Route path='/boardcreate' element={<BoardCreate />} />
      </Routes>
    </Router>
  );
}
function BoardListLayout() {
  return (
    <div className={styles.boardListPage}>
      <Navbar />
      <Routes>
        <Route path='/' element={<BoardList />} />
      </Routes>
      <Friend />
    </div>
  );
}
function BoardPageLayout() {
  return (
    <div className={styles.boardPage}>
      <Navbar />
      <Routes>
        <Route path='board/:id' element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
