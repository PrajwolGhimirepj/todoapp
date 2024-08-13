import React, { useRef, useState } from "react";
import "./List.css";

const List = () => {
  const [List, setList] = useState([]);
  const [newList, setNewList] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const ListRef = useRef();

  const handelInput = (event) => {
    setNewList(event.target.value);
  };

  const addList = () => {
    if (newList.trim() !== "") {
      setList([...List, newList]);
      setNewList("");
    }
  };

  const deletetask = () => {
    ListRef.current.classList.add("animate");

    setTimeout(() => {
      if (deleteIndex !== null) {
        setDeleteIndex(null);
        setList(List.filter((_, index) => index !== deleteIndex));

        ListRef.current.classList.remove("animate");
      }
    }, 1500);
  };

  return (
    <>
      <div className="appcontainer">
        <div className="inputcontainer">
          <div className="input font">
            <input type="text" value={newList} onChange={handelInput} />
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
                setDeleteIndex(index);
              }}
            >
              {context}
            </div>
          ))}
        </div>
        <div>
          <h1>Delete Index</h1>
          {deleteIndex !== null ? deleteIndex : "No task selected"}
        </div>
      </div>
    </>
  );
};

export default List;
