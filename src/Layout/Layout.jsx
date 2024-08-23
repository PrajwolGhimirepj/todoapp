import React from "react";
import "./Layout.css";
import List from "../Main/Lists";
import Nav from "../Nav/Nav";
import Help from "../Info/Help/Help";
import Info from "../Info/TopInfo/info";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <div className="nav">
          <Nav />
        </div>

        <div className="main">
          <List />
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
