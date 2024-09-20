import react, { useEffect } from "react";
import "./Complete.css";
import Card from "./CompleteCard/Card";

const Completed = (props) => {
  useEffect(() => {
    console.log("This is log form complete", props.comp);
  });
  return (
    <>
      <div className="appcontainer font">
        <div className="tital font ">
          <h1>COMPLETED</h1>
        </div>
        <div className="lists">
          {props.comp.map((list, index) => (
            <Card content={list} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Completed;
