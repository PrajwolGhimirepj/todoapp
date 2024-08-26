import React, { useRef } from "react";
import "./Help.css";
import Cardd from "../HelpCards/Cradd";

const Help = () => {
  const arr = [
    { context: "To delete Task", scr: "Del.svg" },
    { context: "To add new Task", scr: "Star.svg" },
  ];
  const itemRefs = useRef({});

  const handleHover = () => {
    setTimeout(() => {
      arr.forEach((_, index) => {
        setTimeout(() => {
          if (itemRefs.current[index]) {
            itemRefs.current[index].classList.remove("slideout");
            itemRefs.current[index].classList.add("animatee");
          }
        }, index * 100); // Apply delay based on index
      });
    });
  };

  const hoverOff = () => {
    arr.forEach((_, index) => {
      const reverseIndex = arr.length - 1 - index;
      setTimeout(() => {
        if (itemRefs.current[reverseIndex]) {
          itemRefs.current[reverseIndex].classList.add("slideout");
          itemRefs.current[reverseIndex].classList.remove("animatee");
        }
      }, index * 100);
    });
  };

  return (
    <>
      <div
        className="helpcontainer "
        onMouseEnter={handleHover}
        onMouseLeave={hoverOff}
      >
        {arr.map((item, id) => (
          <div
            className="animatecard "
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
          >
            <Cardd src={item.src} context={item.context} />
          </div>
        ))}
        <div className="bottom  font">Help</div>
      </div>
    </>
  );
};

export default Help;
