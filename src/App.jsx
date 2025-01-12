import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login/Login";
import NewUser from "./NewUser/NewUser";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";

const App = () => {
  return (
    <Router>
      <div className="wholeapp">
        <div className="app-container">
          <div className="nav-profile">
            <div className="profile">
              <Profile />
            </div>
          </div>
          <div className="app-container-a">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="Login/*" element={<Login />} />
              <Route path="Newuser" element={<NewUser />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
