import React, { useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import "../Rive.css";

const ProgressBar = ({ value }) => {
  const stateMachines = "State";
  const { rive, RiveComponent } = useRive({
    src: "progress_bar.riv",
    stateMachines: stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  const hoverInput = useStateMachineInput(rive, stateMachines, "Value");

  useEffect(() => {
    if (rive && hoverInput) {
      hoverInput.value = value;
    }
  }, [rive, hoverInput]);

  return (
    <div className="g">
      <RiveComponent />
    </div>
  );
};

export default ProgressBar;
