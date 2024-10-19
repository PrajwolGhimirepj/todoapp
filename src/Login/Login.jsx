import React, { useEffect, useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig/firebaseconfig"; // Make sure your Firebase config is correct
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errpassword, setErrPassword] = useState(null);
  const [erremali, setErrEmail] = useState(null);
  const navigate = useNavigate();

  const handeluserName = (event) => {
    setUserName(event.target.value);

    // Email validation
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(event.target.value)) {
      setErrEmail(" * Please enter a valid email");
    } else {
      setErrEmail(null);
    }
  };

  const handelPassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setErrPassword(" * Password should be at least 6 characters");
    } else {
      setErrPassword(null);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null); // Reset any previous errors
    try {
      // Firebase Authentication for sign-in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log("Login Successful:", userCredential);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("Failed to login. Check your credentials.");
    }
  };

  return (
    <>
      <div>
        <p className="error ">{error}</p>
      </div>

      <div className="container">
        <div className="sideimage">
          <img src="../Images/1.jpg" alt="" />
        </div>
        <div className="login">
          <div className="tital">
            <div className="heading">
              <h1>Login</h1>
            </div>
            <div className="infoo font">
              Welcome back! Please login to you account.
            </div>
          </div>
          <div className="input-l">
            <div className="inputcontainers">
              <div className="info font">Email</div>
              <input
                className="input-n"
                type="email"
                autoComplete="on"
                onChange={handeluserName}
              />
            </div>
            <div className="inputcontainers">
              <div className="info font">
                <p className="info-err">{erremali}</p>
                <p>Password</p>
              </div>
              <input
                className="input-n"
                type="password"
                autoComplete="on"
                onChange={handelPassword}
              />
            </div>
          </div>

          <div className="remember font">
            <div className="re">
              <p className="info-err">{errpassword}</p>
              <p className="check-c">
                <input id="check" type="checkbox" />
                <p className="check-60">Remember me</p>
                <div className="fo"> Forgot password ?</div>
              </p>
            </div>
          </div>

          <div className="loginbuton" onClick={handleSubmit}>
            <Link to="/">
              <h1 className="i">Login</h1>
            </Link>
          </div>
          <div className="newuser font">
            <h4>New user ?</h4>

            <Link to="/Newuser">
              <h5 id="s">Singnup</h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
