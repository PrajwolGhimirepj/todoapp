import React, { useEffect, useState } from "react";
import "./Layout.css";
import List from "../Main/Lists";
import Nav from "../Nav/Nav";
import Help from "../Info/Help/Help";
import Info from "../Info/TopInfo/info";

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
          <Nav completedarr={arr} />
        </div>

        <div className="main">
          <List getarr={getarr} />
        </div>
        <div className="info">
          <Info />
          <Help />
        </div>
      </div>
    </>
  );
};
export default Layout;
