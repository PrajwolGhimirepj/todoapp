import React, { useState, useRef, useEffect } from "react";
import Card from "./Card/Card";

const Lists = () => {
  const [List, setList] = useState([]);
  const [newList, setNewList] = useState("");
  const [listToDelete, setListToDelete] = useState(null);
  const listRef = useRef([]);

  const handleInput = (event) => {
    setNewList(event.target.value);
  };

  const addList = () => {
    if (newList.trim() !== "") {
      setList([...List, newList]);
      setNewList(""); // Clear the input field after adding the task
    }
  };

  const deleteTask = () => {
    if (listToDelete !== null) {
      // Apply the 'deleting' class to the item
      listRef.current[listToDelete].classList.add("deleting");

      // Wait for the animation to finish before deleting the item
      setTimeout(() => {
        const newArray = List.filter((_, index) => listToDelete !== index);
        setList(newArray);
        setListToDelete(null);
      }, 500); // Match this duration to your CSS animation duration
    }
  };

  useEffect(() => {
    // Reset the class when the list is updated
    if (listToDelete !== null && listRef.current[listToDelete]) {
      listRef.current[listToDelete].classList.remove("deleting");
    }
  }, [List]);

  return (
    <>
      <div>
        <input type="text" value={newList} onChange={handleInput} />
        <button onClick={addList}>ADD</button>
        <button onClick={deleteTask}>DELETE</button>
      </div>
      <div>
        <h1>Lists</h1>
        {List.map((item, index) => (
          <div
            ref={(el) => (listRef.current[index] = el)}
            key={index}
            onClick={() => setListToDelete(index)}
          >
            <Card task={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Lists;
