import React from "react";
import { Stepper, Step, StepButton } from "@material-ui/core";

const Steps = ({ step1, step2, step3, step4 }) => {
  return (
    <Stepper alternativeLabel nonLinear style={{ backgroundColor: "inherit" }}>
      {step1 && (
        <Step active>
          <StepButton>{"Login"}</StepButton>
        </Step>
      )}
      {step2 && (
        <Step active>
          <StepButton>{"Shipping"}</StepButton>
        </Step>
      )}
      {step3 && (
        <Step active>
          <StepButton>{"Payment"}</StepButton>
        </Step>
      )}
      {step4 && (
        <Step active>
          <StepButton>{"Order"}</StepButton>
        </Step>
      )}
    </Stepper>
  );
};

export default Steps;
