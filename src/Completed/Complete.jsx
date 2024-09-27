import React, { useEffect, useRef, useState } from "react";
import "./Complete.css";
import Card from "./CompleteCard/Card";
import Delete from "../Rive/Delete/Delete";

const Completed = (props) => {
  const cardRefs = useRef({});
  const [arr, setArr] = useState(props.comp);

  useEffect(() => {
    setArr(props.comp);
    console.log(
      "Function from Completed component (deletefun):",
      props.deletefun
    );
  }, [props.comp]);

  const [hover, setHover] = useState(false);
  const handleHover = () => setHover(true);
  const handleHoverOff = () => setHover(false);

  const handleClick = () => {
    setTimeout(() => {
      if (typeof props.deletefun === "function") {
        props.deletefun();
        console.log("Delete button clicked and function called");
      } else {
        console.log("Delete function not available");
      }
    }, 2000);

    animateOut();
  };

  const animateOut = () => {
    // Loop through each card ref and add the 'slideout' class with a delay
    Object.keys(cardRefs.current).forEach((key, index) => {
      setTimeout(() => {
        const card = cardRefs.current[key];
        if (card) {
          card.classList.add("popdown");
        }
      }, 100 * index); // Apply a delay that increases with each card
    });
  };

  return (
    <div className="appcontainer font">
      <div className="tital">
        <div
          className="tcon"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOff}
        >
          <h1 id="comp">Completed</h1>
          <div className="icons-c">
            <div className="icon-c " onClick={handleClick}>
              <Delete state={hover} />
            </div>
          </div>
        </div>
      </div>
      <div className="lists-c">
        {arr.map((list, index) => (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className="card-c "
            key={index}
          >
            <Card content={list} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Completed;
