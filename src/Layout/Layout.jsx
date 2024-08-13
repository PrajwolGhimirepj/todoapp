import React from "react";
import "./Layout.css";
import List from "../Lists";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <div className="nav"></div>
        <div className="main">
          <List />
        </div>
        <div className="info"></div>
      </div>
    </>
  );
};
export default Layout;
