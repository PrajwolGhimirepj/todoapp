import React, { useState } from "react";
import "./Card.css";
import Delete from "../../Rive/Delete/Delete";

const Card = (props) => {
  return (
    <>
      <div className="card font">{props.content}</div>
    </>
  );
};

export default Card;
