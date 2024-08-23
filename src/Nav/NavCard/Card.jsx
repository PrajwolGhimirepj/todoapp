import react from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <>
      <a href="" className="card font ">
        <div>{props.context}</div>
      </a>
    </>
  );
};

export default Card;
