import React, { useRef, useState } from "react";
import "./List.css";
import Delete from "../Rive/Delete/Delete";
import { useEffect } from "react";
import Star from "../Rive/Star/Star";
import Complete from "../Rive/Complete/Complete";

const List = (props) => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [hover, setHover] = useState(null);
  const itemRefs = useRef({});
  const inputeRef = useRef();
  const buttonRef = useRef();

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    props.getarr(completed);
    props.getdell(() => handelcompletedeleted);
  }, [completed]);

  const handelComplete = (item) => {
    setCompleted((prevList) => {
      const newCompleted = [...prevList, item.content];
      return newCompleted;
    });

    deleteItem(item.id);
  };

  //Clear completed List

  const handelcompletedeleted = () => {
    setCompleted([]);
  };
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

  // Adding Items
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

  // Deleteing Items
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
          <div className="input">
            <input
              className=" in font"
              ref={inputeRef}
              placeholder="Enter Lists here !! "
              type="text"
              value={newItem}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />

            <button ref={buttonRef} className="font " onClick={addItem}>
              Add
            </button>
          </div>
        </div>

        <div className="lists font">
          {list.map((item) => (
            <div
              className="huh"
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="contexts">
                <div className="fades"></div>
                <div className="contextt">{item.content}</div>
              </div>
              <div className="icons">
                <div className="icon" onClick={() => handelComplete(item)}>
                  <Complete state={hover === item.id} />
                </div>
                <div className="icon" onClick={() => deleteItem(item.id)}>
                  <Delete state={hover === item.id} />
                </div>
                <div className="icon">
                  <Star state={hover === item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
