import react from "react";
import "./Complete.css";
import Card from "./CompleteCard/Card";

const Complete = (props) => {
  return (
    <>
      <div className="nav1">
        <div className="tital  font">
          <h1>COMPLETED </h1>
          <h1>TASKs</h1>
        </div>
        <div className="compContainer">
          {props.completedarr.map((list, index) => (
            <Card content={list} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Complete;
