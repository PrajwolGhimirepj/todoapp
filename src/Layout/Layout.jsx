import React, { useEffect, useState } from "react";
import "./Layout.css";
import List from "../Lists/Lists";
import Completed from "../Completed/Complete";
import Profile from "../Profile/Profile";
import Stats from "../Stats/Stats";

const Layout = () => {
  const [arr, setArr] = useState([]);
  const [del, setdell] = useState(null);

  const getdell = (delfunc) => {
    setdell(delfunc);
  };

  useEffect(() => {});
  const getarr = (list) => {
    setArr(list);
  };
  useEffect(() => {
    console.log(" Function in Layout component( del)", del);
  });
  return (
    <>
      <div className="container">
        <nav className="navigation">dfsdasdasd</nav>
        <div className="listandall">
          <div className="profile">
            <Profile />
          </div>
          <div className="listandcompleted">
            <div className="listscon">
              <List getarr={getarr} getdell={getdell} />
            </div>
            <div className="completed">
              <Completed comp={arr} deletefun={del} />
            </div>
            <div className="stats">
              <Stats />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
