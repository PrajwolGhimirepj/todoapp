import React, { useRef, useState } from "react";
import "./List.css";
import Delete from "./Rive/Delete";

const List = () => {
  const [List, setList] = useState([]);
  const [newList, setNewList] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [hover, setHover] = useState(null);
  const ListRef = useRef();

  // if (hover === true) {
  //   console.log("hover");
  // } else if (hover === false) {
  //   console.log("hoveroff");
  // }

  const handelInput = (event) => {
    setNewList(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addList();
    }
  };

  const handelCLick = () => {
    ListRef.current.classList.toggle("s");
  };

  const addList = () => {
    if (newList.trim() !== "") {
      setList([...List, newList]);
      setNewList("");
    }
  };

  const deletetask = () => {
    ListRef.current.classList.add("animate");
    ListRef.current.classList.remove("s");

    setTimeout(() => {
      if (deleteIndex !== null) {
        setDeleteIndex(null);
        setList(List.filter((_, index) => index !== deleteIndex));
        ListRef.current.classList.remove("animate");
      }
    }, 1000);
  };

  return (
    <>
      <div className="appcontainer">
        <div className="inputcontainer">
          <div className="input font">
            <input
              type="text"
              value={newList}
              onChange={handelInput}
              onKeyDown={handleKeyDown} // Add this line
            />
            <button onClick={addList}>Add</button>
            <button onClick={deletetask}>Delete</button>
          </div>
        </div>

        <div className="lists">
          {List.map((context, index) => (
            <div
              className="huh "
              key={index}
              ref={index === deleteIndex ? ListRef : null}
              onClick={() => {
                handelCLick(index);
              }}
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <div className="context"> {context}</div>

              <div
                className="delete"
                onClick={() => {
                  setDeleteIndex(index);
                  deletetask();
                }}
              >
                <Delete state={hover} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
