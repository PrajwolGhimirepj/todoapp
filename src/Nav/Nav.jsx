import react from "react";
import "./Nav.css";
import Card from "./NavCard/Card";

const Nav = (props) => {
  return (
    <>
      <div className="nav1">
        {props.completedarr.map((list, index) => (
          <Card content={list} />
        ))}
      </div>
    </>
  );
};

export default Nav;
