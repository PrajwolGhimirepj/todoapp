import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login/Login";
import NewUser from "./NewUser/NewUser";
import Home from "./Home/Home";
import { auth } from "./firebaseconfig/firebaseconfig";

const App = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  return (
    <Router>
      <div className="wholeapp">
        <div className="nav font-t">
          <div className="flex-c">
            <div className="felx font-t">
              <Link to="/">
                <h2>Home</h2>
              </Link>
              <Link to="Login">
                <h2>Login</h2>
              </Link>
            </div>
          </div>
          <p></p>
          <div className="felx">
            <h2>Artwork</h2>
            <a
              id="a"
              href="https://www.instagram.com/gadoodlez_/ "
              target="_blank"
              rel="noreferrer"
            >
              @gadoodlez
            </a>
          </div>
        </div>

        <div className="app-container-a">
          <Routes>
            <Route path="/" element={<Home userEmail={userEmail} />} />
            <Route path="Login/*" element={<Login />} />
            <Route path="Newuser" element={<NewUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
