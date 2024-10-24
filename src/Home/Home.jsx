import React, { useEffect, useState } from "react";
import "./Home.css";
import List from "../Lists/Lists";
import Completed from "../Completed/Complete";
import Profile from "../Profile/Profile";
import Stats from "../Stats/Stats";

const Home = (props) => {
  const [arr, setArr] = useState([]);
  const [del, setdell] = useState(null);

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
        <div className="listandall">
          <div className="listandcompleted">
            <div className="listscon">
              <List getarr={getarr} getdell={getdell} />
            </div>
            {/* <div className="completed">
              <Completed comp={arr} deletefun={del} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
