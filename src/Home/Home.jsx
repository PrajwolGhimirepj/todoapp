import React, { useEffect, useState } from "react";
import "./Home.css";
import List from "../Lists/Lists";
import Completed from "../Completed/Complete";
import Profile from "../Profile/Profile";
import Stats from "../Stats/Stats";

const Home = (props) => {
  const [arr, setArr] = useState([]);
  const [del, setdell] = useState(null);

  const [state, setstate] = useState(false);

  const handelState = () => {
    setstate(true);
  };

  const handelStateoff = () => {
    setstate(false);
  };
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
      <div className="container-h">
        <nav className="navigation-t"></nav>
        <div className="listandall">
          <div
            className="profile"
            onMouseEnter={handelState}
            onMouseLeave={handelStateoff}
          >
            <Profile state={state} userEmail={props.userEmail} />
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

export default Home;
