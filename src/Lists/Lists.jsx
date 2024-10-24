import React, { useRef, useState, useEffect } from "react";
import "./List.css";
import Delete from "../Rive/Delete/Delete";
import Star from "../Rive/Star/Star";
import Complete from "../Rive/Complete/Complete";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebaseconfig/firebaseconfig";

const List = (props) => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [hover, setHover] = useState(null);
  const itemRefs = useRef({});
  const inputeRef = useRef();
  const buttonRef = useRef();
  const [completed, setCompleted] = useState([]);

  const currentUserUID = auth.currentUser?.uid; // Get current logged-in user's UID

  useEffect(() => {
    // Real-time listener for Firestore document
    const docRef = doc(db, "List", "TodoList");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setList(data.ListItems || []);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    props.getarr(completed);
    props.getdell(() => handelcompletedeleted);
    inputeRef.current.focus();
  }, [completed]);

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

  // Adding Items to Firestore asynchronously after rendering locally
  const addItem = async () => {
    buttonRef.current.classList.add("click");
    setTimeout(() => {
      buttonRef.current.classList.remove("click");
    }, 900);

    if (newItem.trim() !== "") {
      const user = auth.currentUser; // Get current user
      if (user) {
        const userUID = user.uid; // Fetch user's unique ID

        // Add item to local state for immediate rendering
        const newItemObject = {
          id: list.length,
          content: newItem,
          uid: userUID,
        };
        setList((prevList) => [...prevList, newItemObject]);
        setNewItem("");

        // Fetch current list from Firestore and update
        const docRef = doc(db, "List", "TodoList");
        const docSnap = await getDoc(docRef);
        const currentList = docSnap.data()?.ListItems || [];

        // Add the new item and update Firestore
        const updatedList = [...currentList, newItemObject];
        await updateDoc(docRef, {
          ListItems: updatedList,
        });
      } else {
        console.log("User not logged in");
      }
    }
  };

  // Deleting Items from Firestore
  const deleteItem = async (id) => {
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1 && itemRefs.current[id]) {
      itemRefs.current[id].classList.add("animate");

      setTimeout(async () => {
        const docRef = doc(db, "List", "TodoList");
        const docSnap = await getDoc(docRef);
        const currentList = docSnap.data().ListItems || [];

        const updatedList = currentList.filter((_, idx) => idx !== index);
        await updateDoc(docRef, {
          ListItems: updatedList,
        });

        setList((prevList) => prevList.filter((item) => item.id !== id));
      }, 1000);
    }
  };

  return (
    <>
      <div className="appcontainer">
        <div className="lists font">
          {list.map((item) => (
            <div
              className="huh"
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              // onClick={() => deleteItem(item.id)}
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                backgroundColor:
                  item.uid === currentUserUID ? "#3c3490" : "#6053f1b8",
                alignSelf:
                  item.uid === currentUserUID ? "flex-start" : "flex-end",
              }}
            >
              <div className="contexts">
                <div
                  className="contextt"
                  style={{
                    justifyContent:
                      item.uid === currentUserUID ? "flex-start" : "flex-end",
                  }}
                >
                  {item.content}
                </div>
              </div>
              <div className="icons">
                {/* <div className="icon" onClick={() => handelComplete(item)}>
                  <Complete state={hover === item.id} />
                </div> */}
                <div className="icon" onClick={() => deleteItem(item.id)}>
                  <Delete state={hover === item.id} />
                </div>
                {/* <div className="icon">
                  <Star state={hover === item.id} />
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="inputcontainer">
          <div className="input">
            <input
              className="in font"
              ref={inputeRef}
              placeholder="Enter messages here"
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
      </div>
    </>
  );
};

export default List;
