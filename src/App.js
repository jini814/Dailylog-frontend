import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//AuthService
import Login from "./Dailylog/Component/Auth/Login";
import SignUp from "./Dailylog/Component/Auth/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
