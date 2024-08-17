import React, { useRef, useState } from "react";
import "./List.css";
import Delete from "./Rive/Delete";
import { useEffect } from "react";

const List = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState();
  const [hover, setHover] = useState(null);
  const itemRefs = useRef({});
  const inputeRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    inputeRef.current.focus();
  }, []);

  const handleInput = (event) => {
    setNewItem(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const handleClick = (index) => {
    if (itemRefs.current[index]) {
    }
  };

  const addItem = () => {
    buttonRef.current.classList.add("click");
    setTimeout(() => {
      buttonRef.current.classList.remove("click");
    }, 900);
    if (newItem.trim() !== "") {
      setList((prevList) => [
        ...prevList,
        { id: Date.now(), content: newItem },
      ]);
      setNewItem("");
    }
  };

  const deleteItem = (id) => {
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1 && itemRefs.current[id]) {
      itemRefs.current[id].classList.add("animate");

      setTimeout(() => {
        setList((prevList) => prevList.filter((item) => item.id !== id));
      }, 1000);
    }
  };

  return (
    <>
      <div className="appcontainer">
        <div className="inputcontainer">
          <div className="input font">
            <input
              ref={inputeRef}
              placeholder=" "
              type="text"
              value={newItem}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
            <button ref={buttonRef} className="" onClick={addItem}>
              Add
            </button>
          </div>
        </div>

        <div className="lists">
          {list.map((item) => (
            <div
              className="huh"
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="context">{item.content}</div>
              <div className="delete" onClick={() => deleteItem(item.id)}>
                <Delete state={hover === item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
