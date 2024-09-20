import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="profile_c">
        <div className="prfilepiccon">
          <div className="img">
            <img src="straw.jpg" alt="" />
          </div>
          <div className="name font">
            <h3>Prajwol Ghimire</h3>
          </div>
        </div>
      </div>
      <div className="graphs"></div>
    </>
  );
};

export default Profile;
