import React, { useEffect, useState } from "react";
import "./Layout.css";
import List from "../Lists/Lists";
import Complete from "../Rive/Complete/Complete";
import Completed from "../Completed/Complete";
import Profile from "../Profile/Profile";

const Layout = () => {
  const [arr, setArr] = useState([]);

  const getarr = (list) => {
    setArr(list);
  };
  useEffect(() => {
    console.log("List of completed Form Layout ", arr);
  });
  return (
    <>
      <div className="container">
        <nav></nav>
        <div className="listandall">
          <div className="profile">
            <Profile />
          </div>
          <div className="listandcompleted">
            <div className="listscon">
              <List getarr={getarr} />
            </div>
            <div className="completed">
              <Completed comp={arr} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
