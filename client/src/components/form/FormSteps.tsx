import { Container, Hidden } from "@mui/material";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
    stepConnectorClasses
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundColor: "#0A2540",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundColor: "#0A2540",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#d3d3d3",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    // backgroundImage:
    //   'linear-gradient( 136deg, #6c7c8c 0%, #3a5066 50%, #0A2540 100%)',
    backgroundColor: "#0A2540",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    // backgroundImage:
    //   'linear-gradient( 136deg, #0A2540 0%, #3a5066 50%, #6c7c8c 100%)',
    // backgroundColor: 'green'
    backgroundColor: "#0A2540",
  }),
}));

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

interface FormStepsProps {
  steps: string[];
  activestep: number;
  icons: { [index: string]: React.ReactElement };
}

const FormSteps: React.FC<FormStepsProps> = ({ steps, activestep, icons }) => {
  const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    // const icons: { [index: string]: React.ReactElement } = {
    //   1: <SettingsIcon />,
    //   2: <GroupAddIcon />,
    //   3: <VideoLabelIcon />,
    // };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };

  return (
    <Hidden smDown>
      <Container sx={{ width: "65%" }}>
        <Stack sx={{ width: "100%", marginTop: "20px" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={activestep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Container>
    </Hidden>
  );
};

export default FormSteps;
