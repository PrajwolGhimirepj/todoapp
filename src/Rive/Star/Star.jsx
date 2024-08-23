import React, { useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

const Star = ({ state }) => {
  const stateMachines = "StarState";
  const { rive, RiveComponent } = useRive({
    src: "st.riv",
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
    <div className="rivecomponentStar">
      <RiveComponent />
    </div>
  );
};

export default Star;
