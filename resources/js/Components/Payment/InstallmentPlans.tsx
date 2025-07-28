import React from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, Typography } from '@mui/material';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const InstallmentPlans = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            <Typography>{step.description}</Typography>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              {index === steps.length - 1 ? 'Finish' : 'Continue'}
            </Button>
            <Button
              disabled={index === 0}
              onClick={handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default InstallmentPlans;
