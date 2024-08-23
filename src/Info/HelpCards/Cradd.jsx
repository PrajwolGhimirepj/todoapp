import React from "react";
import "./Cardd.css";

const Cardd = (props) => {
  return (
    <>
      <div className="cardd">
        <div className="image">
          <img src={props.src} alt="" />
        </div>
        <div className="context font">{props.context}</div>
      </div>
    </>
  );
};

export default Cardd;
