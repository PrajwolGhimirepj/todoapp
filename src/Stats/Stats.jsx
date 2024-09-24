import react, { useEffect } from "react";
import "./Stats.css";
import ProgressBar from "../Rive/ProgressBar/ProgressBar";

const Stats = () => {
  return (
    <>
      <div className="appcontainer font">
        <div className="titall">
          <h2 className="tcon">Info</h2>
        </div>
        <div className="lists-cc">
          <div className="rcon">
            <div className="graphh">{/* <ProgressBar value={60} /> */}</div>
          </div>
          <div className="rcon">
            <div className="graphh"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
