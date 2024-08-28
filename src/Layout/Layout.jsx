import React, { useEffect, useState } from "react";
import "./Layout.css";
import List from "../Main/Lists";

import Help from "../Info/Help/Help";

import Complete from "../Completed/Complete";

const Layout = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    console.log(" this console log is from the layout component ", arr);
  });
  const getarr = (list) => {
    setArr(list);
  };
  return (
    <>
      <div className="layout">
        <div className="nav">
          <Help />
        </div>
        <div className="main">
          <List getarr={getarr} />/
        </div>
        <div className="info">
          <Complete completedarr={arr} />
        </div>
      </div>
    </>
  );
};
export default Layout;
