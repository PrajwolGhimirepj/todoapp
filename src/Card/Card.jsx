import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <>
      <div className="card">
        <div className="context">
          <span>{props.task}</span>
        </div>
      </div>
    </>
  );
};
export default Card;
