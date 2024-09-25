import React from "react";
import "./Profile.css";
import ProgressBar from "../Rive/ProgressBar/ProgressBar";

const Profile = () => {
  return (
    <>
      <div className="profile_c">
        <div className="prfilepiccon">
          <div className="img">
            <img src="straw.jpg" alt="" />
          </div>
          <div className="name font">
            <h3>Name placeholder</h3>
          </div>
        </div>
      </div>
      <div className="container-g">
        <div className="graph">{/* <ProgressBar value={92} /> */}</div>
        <div className="graph">{/* <ProgressBar value={50} /> */}</div>
      </div>
    </>
  );
};

export default Profile;
