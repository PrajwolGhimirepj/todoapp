import React from "react";
import "./Layout.css";
import List from "../Lists";
import Nav from "../Nav/Nav";
import Info from "../SideInfo/info";

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
        </div>
      </div>
    </>
  );
};
export default Layout;
