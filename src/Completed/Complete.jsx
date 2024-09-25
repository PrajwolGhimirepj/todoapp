import react, { useEffect, useState } from "react";
import "./Complete.css";
import Card from "./CompleteCard/Card";
import Delete from "../Rive/Delete/Delete";

const Completed = (props) => {
  // arry

  const [arr, setarr] = useState(props.comp);

  useEffect(() => {
    setarr(props.comp);
    console.log(
      "Function Form Completed componenet (deletefun) ",
      props.deletefun
    );
  }, [props.comp]);

  // animation
  const [hover, setHover] = useState(null); // Use useState, not useEffect
  const handleHover = () => {
    setHover(true);
  };
  const handleHoverOff = () => {
    setHover(false);
  };
  const handelclick = () => {
    if (typeof props.deletefun === "function") {
      props.deletefun();
      console.log("delete button clicked and function called");
    } else {
      console.log("delete function not available");
    }
  };

  return (
    <>
      <div className="appcontainer font">
        <div className="tital">
          <div
            className="tcon"
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOff}
          >
            <h1 id="comp">Completed</h1>
            <div className="icons-c ">
              <div className="icon-c" onClick={handelclick}>
                <Delete state={hover} />
              </div>
            </div>
          </div>
        </div>
        <div className="lists-c">
          {arr.map((list, index) => (
            <Card key={index} content={list} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Completed;
