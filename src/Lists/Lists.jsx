import React, { useRef, useState, useEffect } from "react";
import "./List.css";
import Delete from "../Rive/Delete/Delete";
import Star from "../Rive/Star/Star";
import Complete from "../Rive/Complete/Complete";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseconfig/firebaseconfig";

const List = (props) => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [hover, setHover] = useState(null);
  const itemRefs = useRef({});
  const inputeRef = useRef();
  const buttonRef = useRef();
  const [completed, setCompleted] = useState([]);

  const currentUser = auth.currentUser;

  // 🔥 Fetch all users’ lists
  useEffect(() => {
    const docRef = doc(db, "List", "TodoList");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const data = docSnap.data();
      if (!data || !data.users) return;

      let combined = [];
      Object.values(data.users).forEach((userObj) => {
        const { email, items } = userObj;
        items.forEach((item) => {
          combined.push({
            ...item,
            email, // attach email for display
          });
        });
      });
      setList(combined);
    });

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
    deleteItem(item);
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

  // 🔥 Add item to current user’s list
  const addItem = async () => {
    buttonRef.current.classList.add("click");
    setTimeout(() => {
      buttonRef.current.classList.remove("click");
    }, 900);

    if (newItem.trim() !== "") {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "List", "TodoList");
        const docSnap = await getDoc(docRef);
        const data = docSnap.data() || {};

        // Ensure user section exists
        if (!data.users) data.users = {};
        if (!data.users[user.uid]) {
          data.users[user.uid] = { email: user.email, items: [] };
        }

        const userItems = data.users[user.uid].items || [];
        const newItemObject = {
          id: userItems.length,
          content: newItem,
        };

        data.users[user.uid].items = [...userItems, newItemObject];

        await updateDoc(docRef, {
          users: data.users,
        });

        setNewItem("");
      } else {
        console.log("User not logged in");
      }
    }
  };

  // 🔥 Delete item from correct user’s list
  const deleteItem = async (item) => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "List", "TodoList");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (data && data.users && data.users[user.uid]) {
      let userItems = data.users[user.uid].items || [];
      userItems = userItems.filter((i) => i.id !== item.id);

      data.users[user.uid].items = userItems;

      await updateDoc(docRef, {
        users: data.users,
      });
    }
  };

  return (
    <>
      <div className="appcontainer">
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

        <div className="lists font">
          {list.map((item, idx) => (
            <div
              className="huh"
              key={idx}
              ref={(el) => (itemRefs.current[idx] = el)}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              style={{
                backgroundColor:
                  item.email === currentUser?.email ? "#b1b1b3ff" : "#333149b8",
                alignSelf: "flex-start",
              }}
            >
              <div className="contexts">
                <div className="contextt">
                  {item.content} - {item.email}
                </div>
              </div>
              <div className="icons">
                {/* <div className="icon" onClick={() => handelComplete(item)}>
                  <Complete state={hover === idx} />
                </div> */}
                <div className="icon" onClick={() => deleteItem(item)}>
                  <Delete state={hover === idx} />
                </div>
                {/* <div className="icon">
                  <Star state={hover === idx} />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
