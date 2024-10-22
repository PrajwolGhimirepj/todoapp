import React, { useRef, useState, useEffect } from "react";
import "./List.css";
import Delete from "../Rive/Delete/Delete";
import Star from "../Rive/Star/Star";
import Complete from "../Rive/Complete/Complete";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
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
      const querySnapshot = await getDocs(collection(db, "List"));
      const fetchedList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().item,
      }));
      setList(fetchedList);
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

  const handleClick = (index) => {
    if (itemRefs.current[index]) {
      // Add any additional click functionality if needed
    }
  };

  // Adding Items to Firestore
  const addItem = async () => {
    buttonRef.current.classList.add("click");
    setTimeout(() => {
      buttonRef.current.classList.remove("click");
    }, 900);

    if (newItem.trim() !== "") {
      // Add to Firestore
      const docRef = await addDoc(collection(db, "List"), {
        item: newItem,
      });

      // Update local state with the new item
      setList((prevList) => [...prevList, { id: docRef.id, content: newItem }]);
      setNewItem("");
    }
  };

  // Deleting Items from Firestore
  const deleteItem = async (id) => {
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1 && itemRefs.current[id]) {
      itemRefs.current[id].classList.add("animate");

      setTimeout(async () => {
        // Delete from Firestore
        await deleteDoc(doc(db, "List", id));

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
