import React, { useState } from "react";
import "./Card.css";
import Delete from "../../Rive/Delete/Delete";

const Card = (props) => {
  const [hover, setHover] = useState(null); // Use useState, not useEffect

  const handleHover = () => {
    setHover(true);
  };

  const handleHoverOff = () => {
    setHover(false);
  };

  return (
    <>
      <div
        className="card font"
        onMouseEnter={handleHover} // Directly call the function
        onMouseLeave={handleHoverOff}
      >
        {props.content}
        <div className="icons">
          <div className="icon">
            <Delete state={hover} />{" "}
            {/* Pass hover state to Delete component */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
