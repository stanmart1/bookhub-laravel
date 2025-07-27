import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutStepper;
