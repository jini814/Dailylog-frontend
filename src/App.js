import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//AuthService
import Login from "./Dailylog/Component/Auth/Login";
import PasswordReset from "./Dailylog/Component/Auth/PasswordReset";
import SignUp from "./Dailylog/Component/Auth/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
