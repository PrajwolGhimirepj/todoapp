import React, { useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

const Delete = ({ state }) => {
  const stateMachines = "State";
  const { rive, RiveComponent } = useRive({
    src: "../riv/Delete.riv",
    stateMachines: stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  const hoverInput = useStateMachineInput(rive, stateMachines, "hover");

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

export default Delete;
