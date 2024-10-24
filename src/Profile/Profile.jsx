import React from "react";
import "./Profile.css";
import ProgressBar from "../Rive/ProgressBar/ProgressBar";
import Cat from "../Rive/Cat/Cat";
import { Link } from "react-router-dom";
import { auth } from "../firebaseconfig/firebaseconfig";
import { useState, useEffect } from "react";

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    console.log(userEmail);
  }, []);
  return (
    <>
      <div className="profile_c">
        <div className="prfilepiccon">
          <div className="img">
            <img src="her.jpg" alt="" />
          </div>
          <div className="name font">
            <h3>{userEmail} </h3>
          </div>
        </div>
      </div>
      <div className="container-g">
        <div className="flex-c font">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="Login">
            <h2>Login</h2>
          </Link>
        </div>
        <p></p>
        {/* <div className="felx">
          <h2>Artwork</h2>
          <a
            id="a"
            href="https://www.instagram.com/gadoodlez_/ "
            target="_blank"
            rel="noreferrer"
          >
            @gadoodlez
          </a>
        </div> */}
      </div>
    </>
  );
};

export default Profile;
