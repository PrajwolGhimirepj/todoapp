import {
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import React from "react";
import { useState, useEffect } from "react";
import { useRive } from "@rive-app/react-canvas";
import "./Delete.css";

const Delete = (props) => {
  const stateMachines = "State";
  const { rive, RiveComponent } = useRive({
    src: "th.riv",
    stateMachines: stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  const Up = useStateMachineInput(rive, stateMachines, "hover");
  const Down = useStateMachineInput(rive, stateMachines, "hover");
  useEffect(() => {
    if (props.state === true) {
      console.log("on");
      Up.value = true;
    } else if (props.state === false) {
      console.log("off");
      Down.value = false;
    }
  }, [props.state]);

  return (
    <>
      <div className="rivecomponent">
        <RiveComponent />
      </div>
    </>
  );
};

export default Delete;
