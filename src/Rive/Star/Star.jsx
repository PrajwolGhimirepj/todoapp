import React, { useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import "../Rive.css";

const Star = ({ state }) => {
  const stateMachines = "StarState";
  const { rive, RiveComponent } = useRive({
    src: "../riv/Star.riv",
    stateMachines: stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  const hoverInput = useStateMachineInput(rive, stateMachines, "Hover");
  const clickinput = useStateMachineInput(rive, stateMachines, "CLick");

  useEffect(() => {
    if (rive && hoverInput) {
      hoverInput.value = state;
    }
  }, [rive, hoverInput, state]);

  return (
    <div className="rivecon">
      <RiveComponent />
    </div>
  );
};

export default Star;
