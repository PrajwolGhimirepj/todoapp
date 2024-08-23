import react from "react";
import "./Nav.css";
import Card from "./NavCard/Card";

const Nav = () => {
  return (
    <>
      <div className="nav1">
        <Card context={"Sunday"} />
        <Card context={"Monday"} />
        <Card context={"Thuesday"} />
        <Card context={"Wednesday"} />
        <Card context={"Thursday"} />
        <Card context={"Friday"} />
      </div>
    </>
  );
};

export default Nav;
