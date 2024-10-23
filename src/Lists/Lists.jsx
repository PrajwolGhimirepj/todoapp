import React, { useRef, useState, useEffect } from "react";
import "./List.css";
import Delete from "../Rive/Delete/Delete";
import Star from "../Rive/Star/Star";
import Complete from "../Rive/Complete/Complete";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig/firebaseconfig";

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

  useEffect(() => {
    inputeRef.current.focus();
  }, []);

  // Fetch list from Firestore on component mount
  useEffect(() => {
    const fetchList = async () => {
      const docRef = doc(db, "List", "ToDOList");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedList = docSnap.data().ListItems || [];
        setList(
          fetchedList.map((item, index) => ({ id: index, content: item }))
        );
      } else {
        console.log("No such document!");
      }
    };
    fetchList();
  }, []);

  const handelComplete = (item) => {
    setCompleted((prevList) => {
      const newCompleted = [...prevList, item.content];
      return newCompleted;
    });
    deleteItem(item.id);
  };

  const handelcompletedeleted = () => {
    setCompleted([]);
  };

  const handleInput = (event) => {
    setNewItem(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  // Adding Items to Firestore
  const addItem = async () => {
    buttonRef.current.classList.add("click");
    setTimeout(() => {
      buttonRef.current.classList.remove("click");
    }, 900);

    if (newItem.trim() !== "") {
      // Update the ListItems array in Firestore
      const docRef = doc(db, "List", "ToDOList");
      const docSnap = await getDoc(docRef);
      const currentList = docSnap.data().ListItems || [];

      // Add the new item to the list and update Firestore
      const updatedList = [...currentList, newItem];
      await updateDoc(docRef, {
        ListItems: updatedList,
      });

      // Update local state with the new item
      setList((prevList) => [
        ...prevList,
        { id: prevList.length, content: newItem },
      ]);
      setNewItem("");
    }
  };

  // Deleting Items from Firestore
  const deleteItem = async (id) => {
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1 && itemRefs.current[id]) {
      itemRefs.current[id].classList.add("animate");

      setTimeout(async () => {
        // Delete the item from Firestore
        const docRef = doc(db, "List", "ToDOList");
        const docSnap = await getDoc(docRef);
        const currentList = docSnap.data().ListItems || [];

        // Filter out the deleted item and update Firestore
        const updatedList = currentList.filter((_, idx) => idx !== index);
        await updateDoc(docRef, {
          ListItems: updatedList,
        });

        // Update local state after deletion
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
            <button ref={buttonRef} className="font" onClick={addItem}>
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
