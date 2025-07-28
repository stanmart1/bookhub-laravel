import React from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, Typography } from '@mui/material';

const steps = [
  {
    label: 'Draft',
    description: 'The book is being written and edited.',
  },
  {
    label: 'Review',
    description: 'The book is being reviewed by the editorial team.',
  },
  {
    label: 'Published',
    description: 'The book has been published and is available for sale.',
  },
];

const PublishingWorkflow = () => {
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

export default PublishingWorkflow;
