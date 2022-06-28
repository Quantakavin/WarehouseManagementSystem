import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";

interface MultiStepNavigationProps {
  loading: boolean;
  StepOne: React.ReactNode;
  StepTwo: React.ReactNode;
}

const MultiStepNavigation: React.FC<MultiStepNavigationProps> = ({
  loading,
  StepOne,
  StepTwo,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  if (step === 1) {
    return (
      <>
        {StepOne}
        <div className="formnavigationcontainer">
          <button className="formnavigation" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            type="button"
            className="nextbutton"
            onClick={() => {
              setStep(step + 1)
              console.log("clicked next")
            }}
          >
            Next{" "}
            <NavigateNextIcon style={{ marginRight: -10, marginLeft: -7 }} />
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      {StepTwo}
      <div className="formnavigationcontainer">
        <button
          type="button"
          className="formnavigation"
          onClick={() => {
            setStep(step - 1)
            console.log("clicked back")
          }}
        >
          Back
        </button>
        {/* <SubmitButton text="Submit" loading={loading} multipart /> */}
      </div>
    </>
  );
};

export default MultiStepNavigation;
