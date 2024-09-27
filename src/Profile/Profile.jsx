import React from "react";
import "./Profile.css";
import ProgressBar from "../Rive/ProgressBar/ProgressBar";
import Cat from "../Rive/Cat/Cat";

const Profile = (props) => {
  return (
    <>
      <div className="profile_c">
        <div className="prfilepiccon">
          <div className="img">
            <img src="Default.jpg" alt="" />
          </div>
          <div className="name font">
            <h3>Name placeholder</h3>
          </div>
        </div>
      </div>
      <div className="container-g">
        <div className="graph">
          <Cat state={props.state} />
        </div>
      </div>
    </>
  );
};

export default Profile;
