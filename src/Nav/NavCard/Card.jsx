import react from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <>
      <div className="card font">{props.content}</div>
    </>
  );
};

export default Card;
