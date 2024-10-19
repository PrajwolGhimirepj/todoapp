import React, { useState } from "react";
import "./NewUser.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig/firebaseconfig"; // Ensure Firebase is correctly set up in your project
import { Link, useNavigate } from "react-router-dom";
const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errpassword, setErrPassword] = useState(null);
  const [erremali, setErrEmail] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Email validation
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(event.target.value)) {
      setErrEmail(" * Please enter a valid email");
    } else {
      setErrEmail(null);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setErrPassword(" * Password should be at least 6 characters");
    } else {
      setErrPassword(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Account created successfully!");
      setLoading(false);
      console.log("User created successfully Please Re-Login");
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create an account. Please try again.");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="newuser-box">
        <div className="image-n">
          <img src="../Images/2.jpg" alt="login" />
        </div>
        <form className="form-n" onSubmit={handleSubmit}>
          <div className="tital-n-t font">Sign Up</div>
          <div className="input-c">
            <div className="tital-n font">Email</div>
            <input
              className="input-n"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="error-n font">{erremali}</div>
          </div>
          <div className="input-c">
            <div className="tital-n font">Password</div>
            <input
              className="input-n font"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="error-n font">{errpassword}</div>
          </div>
          <div className="space"></div>
          <button type="submit" className="tital-n-s font">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default NewUser;
