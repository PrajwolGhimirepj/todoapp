import {
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import React, { useState, useEffect } from "react";
import { useRive } from "@rive-app/react-canvas";
import "./Cat.css";

const Cat = ({ state }) => {
  const stateMachines = "State";
  const { rive, RiveComponent } = useRive({
    src: "../riv/catno.riv",
    stateMachines: stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.TopRight,
    }),
  });

  const hoverInput = useStateMachineInput(rive, stateMachines, "Hover");
  const Xpo = useStateMachineInput(rive, stateMachines, "X");
  const Ypo = useStateMachineInput(rive, stateMachines, "Y");

  useEffect(() => {
    if (rive && hoverInput) {
      hoverInput.value = state;
    }
  }, [rive, hoverInput, state]);

  useEffect(() => {
    const updateMousePosition = (event) => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      if (Xpo && Ypo) {
        Xpo.value = (event.clientX / width) * 100;
        Ypo.value = (event.clientY / height) * 100;
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [rive, Xpo, Ypo]);

  return (
    <div className="rivecomponent">
      <RiveComponent />
    </div>
  );
};

export default Cat;
