import React, { useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

const Complete = ({ state }) => {
  const stateMachines = "StateClick";
  const { rive, RiveComponent } = useRive({
    src: "cum.riv",
    stateMachines: stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  const hoverInput = useStateMachineInput(rive, stateMachines, "hover");
  const clickinput = useStateMachineInput(rive, stateMachines, "Click");

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

export default Complete;
