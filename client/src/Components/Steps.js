import React from "react";
import { Stepper, Step, StepButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const Steps = ({ step1, step2, step3, step4 }) => {
  return (
    <Stepper alternativeLabel nonLinear style={{ backgroundColor: "inherit" }}>
      <Step active={step1} disabled={!step1}>
        <StepButton component={Link} to={"/login"}>
          {"Login"}
        </StepButton>
      </Step>
      <Step active={step2} disabled={!step2}>
        <StepButton component={Link} to={"/shipping"}>
          {"Shipping"}
        </StepButton>
      </Step>
      <Step active={step3} disabled={!step3}>
        <StepButton component={Link} to={"/payment"}>
          {"Payment"}
        </StepButton>
      </Step>
      <Step active={step4} disabled={!step4}>
        <StepButton component={Link} to={"/placeorder"}>
          {"Order"}
        </StepButton>
      </Step>
    </Stepper>
  );
};

export default Steps;
